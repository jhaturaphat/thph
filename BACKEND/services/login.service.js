require('dotenv').config();
const jwt = require("jsonwebtoken");
const connection = require('../configs/databases');
const crypto = require('crypto');

module.exports = {
    onLogin(value){
        return new Promise((resolve, reject) => {           
            connection.query("SELECT userid FROM tambonservice WHERE userid=? AND pass=?",[ value['userid'], value['pass'] ],(error, result)=>{
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
                
            })
        })
    }
}