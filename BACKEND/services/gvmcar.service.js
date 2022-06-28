const connection = require('../configs/databases');


module.exports = {
    onRevSave(value){        
        return new Promise((resolve, reject)=>{ 
            connection.query(`INSERT INTO gvmcar_rsv SET ?`, value, (error, result)=>{                
                if(error) return reject(error);                 
                resolve(result);
            });            
        }) 
    },
    onFindAll(){
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM gvmcar_rsv LIMIT 20`,(error, result)=>{
                if(error) return reject(error);
                resolve(result);
            });
        })
    }
}