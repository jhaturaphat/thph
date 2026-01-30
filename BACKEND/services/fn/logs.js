const {logDB} = require('../../configs/databases');

module.exports = {
    async logRecord(log){
        return await new Promise((resolve, reject) => {
            const command = "INSERT INT lab_logs (user_id, action, detail, ip_address, user_agent) VALUES (?,?,?,?,?)";
            logDB.query(command,[],(error, result)=>{
                if(error){
                return reject(error);
                }
                return resolve(results);
            })
            return reject("null");
        })
    },
};