const connection = require('../configs/databases');
const { splitDateRange, fetchData } = require('../services/fn/lab.query');

module.exports = {
    async onFind (value){        
        // return new Promise(async (resolve, reject)=>{ 
            const start_date = value['lab_start_date'];
            const end_date = value['lab_end_date'];
            const stepDays = 1;

            console.log(start_date, ' ถึง ', end_date);
            // return resolve(true);

            const diffInMs = new Date(end_date) - new Date(start_date);
            const diffDays = diffInMs / (1000 * 60 * 60 * 24);

            if(diffDays > 32) return new Promise((resolve, reject) => {
                reject({message:"ช่วงการดึงข้อมูลมากกว่า 31 วัน"});
            });
            // แบ่งช่วงเวลา
            const dateRanges = splitDateRange(start_date, end_date, stepDays);
             console.log(dateRanges);
           
            try {
                console.log('Start fetching data');
        
                // ใช้ Promise.all เพื่อ Query ทุกช่วงเวลา
                const results = await Promise.all(
                    dateRanges.map((range) => fetchData(range))
                );
        
                // รวมผลลัพธ์ทั้งหมด
                const combinedResults = results.flat();
                    
                // console.log('Finished fetching data:', combinedResults);
                return combinedResults;
                // ประมวลผลข้อมูลเพิ่มเติมหรือส่งกลับไปยัง Frontend
            } catch (err) {
                console.error('Error fetching data:', err);
                return false;
            } finally {
                connection.end(); // ปิด Connection Pool                
            } 

            //console.log(sql);
            // connection.query(sql,[start_date, end_date], (error, result)=>{                 
            //     if(error) return reject(error);                  
            //     resolve(result);
            // });            
        // })
    },
    onFindAll(){
        return new Promise((resolve, reject)=>{
            connection.query(` `,(error, result)=>{
                if(error) reject(error);
                resolve(result);
            });
        })
    } 
}