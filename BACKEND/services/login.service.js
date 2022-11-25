require('dotenv').config();
const jwt = require("jsonwebtoken");
const connection = require('../configs/databases');
const crypto = require('crypto');

module.exports = {
    onLogin(value){
        return new Promise((resolve, reject) => {
            connection.query("SELECT userid FROM tambonservice WHERE userid=? AND pass=?",[value['username'], value['password']],(error, result)=>{
                if(error) {
                    reject(error);
                }
                console.log(result[0].userid);
                if(!result.length > 0) {
                    reject("Username or password is invlid");
                }
                const payload = {
                    name: result[0].userid,
                    uuid: crypto.randomUUID(),         
                    // scopes: ["create","read","update","delete"], //For Permission FULL
                    scopes: ["read"]
                };

                const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1h"}); 
                const access_token = new Object();
                        access_token.token = token;
                resolve(access_token);
            })
        })
    }
}