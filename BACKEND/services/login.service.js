const connection = require('../configs/databases');

module.exports = {
    Login(value){
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM tambonservice WHERE userid=? AND pass=?",[value],(error, result)=>{
                if(error) {
                    reject()
                }
                resolve();
            })
        })
    }
}