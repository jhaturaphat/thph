const connection = require('../configs/databases');


module.exports = {
    onRevSave(value){        
        return new Promise((resolve, reject)=>{      
            value['gvmcar_rsv_start_date'];
            connection.query(`INSERT INTO gvmcar_rsv (
                gvmcar_rsv_num_of_ple,
                gvmcar_rsv_trip_job,
                gvmcar_rsv_trip_detail,
                gvmcar_rsv_start_date,
                gvmcar_rsv_end_date
                ) VALUES (?,?,?,?,?)
            `,
             value['gvmcar_rsv_num_of_ple'],
             value['gvmcar_rsv_trip_job'],
             value['gvmcar_rsv_trip_detail'],
             value['gvmcar_rsv_start_date'],
             value['gvmcar_rsv_end_date']
             , (error, result)=>{                
                if(error){
                    console.log(error);
                    return reject(error);
                } 
                resolve(result);
            });            
        }) 
    }
}