require('dotenv').config();
const jwt = require("jsonwebtoken");
const connection = require('../configs/databases');
const { notify } = require("../services/line.service")
const crypto = require('crypto');

module.exports = {
    onLogin(value){
        // console.log(value);
        return new Promise((resolve, reject) => {           
            connection.query("SELECT userid FROM tambonservice WHERE userid = ? AND pass = ?",[ value['userid'], value['pass'] ] ,(error, result)=>{
                if(error) {
                    return reject(error);
                }                
                if(!result.length > 0) {
                    return reject({message:"Username or password is invlid"});
                }else{
                    const payload = {
                        name: result[0].userid,
                        uuid: crypto.randomUUID(),         
                        // scopes: ["create","read","update","delete"], //For Permission FULL
                        scopes: ["read"]
                    };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1h"}); 
                    const access_token = new Object();
                          access_token.token = token;
                    return resolve(access_token);
                }
                
            });
        })
    },
    onLoginAttempts(value){               
        return new Promise((resolve, reject) => {           
            connection.query("SELECT userid, pass, login_attempts, lock_until FROM tambonservice WHERE userid = ?", [ value['userid'] ], (error, result) => {
                if(error) {
                    return reject(error);
                }
                
                // ถ้าพบว่าไม่มี user นี้อยู่ในระบบ
                if(result.length === 0) {
                    return reject({message:"Username or password is invalid"});
                }
    
                const user = result[0];
    
                // ตรวจสอบว่าบัญชีถูกล็อกอยู่หรือไม่
                if (user.lock_until && user.lock_until > Date.now()) {
                    notify(value['userid']);
                    return reject({message: "ลองอีกครั้งในภายหลัง"});
                }
    
                // ตรวจสอบรหัสผ่าน
                if (user.pass !== value['pass']) {
                    // เพิ่มจำนวนครั้งที่พยายามล็อกอินไม่สำเร็จ
                    let attempts = user.login_attempts + 1;
                    let lockUntil = null;
    
                    if (attempts >= 5) {
                        // ถ้าล็อกอินไม่สำเร็จเกิน 5 ครั้ง, ล็อกบัญชี 15 นาที
                        lockUntil = Date.now() + 15 * 60 * 1000;
                        attempts = 0; // reset attempt count after locking
                    }
    
                    // อัพเดตฐานข้อมูล
                    connection.query("UPDATE tambonservice SET login_attempts = ?, lock_until = ? WHERE userid = ?", [ attempts, lockUntil, value['userid'] ], (err) => {
                        if (err) return reject(err);
                        return reject({message:"Username or password is invalid"});
                    });
                } else {
                    // รีเซ็ตจำนวนครั้งที่พยายามเมื่อเข้าระบบสำเร็จ
                    connection.query("UPDATE tambonservice SET login_attempts = 0, lock_until = NULL WHERE userid = ?", [ value['userid'] ], (err) => {
                        if (err) return reject(err);
    
                        const payload = {
                            name: user.userid,
                            uuid: crypto.randomUUID(),         
                            scopes: ["read"]
                        };
    
                        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"4h"}); 
                        const access_token = { token };
                        return resolve(access_token);
                    });
                }
            });
        });
    }
}