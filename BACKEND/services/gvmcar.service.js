const connection = require('../configs/databases');


module.exports = {
    onReserve(value){        
        return new Promise((resolve, reject)=>{ 
            // resolve(value);           
            connection.query(`INSERT INTO gvmcar_rsv (
                gvmcar_rsv_num_of_ple,
                gvmcar_rsv_trip_job,
                gvmcar_rsv_trip_detail,
                gvmcar_rsv_start_date,
                gvmcar_rsv_end_date
                ) VALUES (?,?,?,?,?)
            `, value, (error, result)=>{
                if(error) return reject(error);
                resolve(result);
            });            
        }) 
    }
}