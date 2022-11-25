const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (credentials = [])=>{
    return (req, res, next) => {        
        if(typeof credentials === "string"){
            credentials = [credentials]           
        }

        //มองหา JWT in Header
        const {authorization} = req.headers        
        if(!authorization) return res.status(401).send({message:"ไม่มีสิทธิ์เข้าถึง: 401 Unauthorized"});        
        // ตรวจสอบ JWT Bearer         
        const tokenBody = authorization.split(' ')[1];        
        jwt.verify(tokenBody, process.env.SECRET_KEY, (err, decoded)=>{
            if(err) return res.status(401).send("Error: 401 Unauthorized");
            // ไม่มีข้อผิดพลาด JWT ดี!
            // ตรวจสอบข้อมูลประจำตัวที่ถูกส่งผ่านใน Header
            if(credentials.length > 0){                          
                if(decoded.scopes && 
                    decoded.scopes.length && 
                    credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)){
                        
                    next();
                }else{
                    return res.status(403).send("Error: 403 Forbidden");
                }
            }else{
                // ไม่จำเป็นต้องมีข้อมูลประจำตัวผู้ใช้ได้รับอนุญาต
                next();
            }

        });
    }
}

// https://github.com/brian-childress/node-authorization-middleware/blob/master/authorization-middleware.js