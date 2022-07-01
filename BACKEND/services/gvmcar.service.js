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
            connection.query(`SELECT * FROM gvmcar_rsv  LEFT JOIN user_register AS user 
            ON gvmcar_rsv.user_register_id = user.line_liff_line_user_id  
            ORDER BY gvmcar_rsv.gvmcar_rsv_start_date LIMIT 20 `,(error, result)=>{
                if(error) return reject(error);
                resolve(result);
            });
        })
    }
}