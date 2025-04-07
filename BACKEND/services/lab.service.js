const connection = require('../configs/databases');
const { splitDateRange, fetchData } = require('../services/fn/lab.query');

module.exports = {
    //ใส่่ 000000000 หน้า HN ให้ครบ 9 หลัก
    formatHn(hn) {
        return hn.padStart(9, '0');
    },
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
                return {message:err};
            } finally {
                //connection.end(); // ปิด Connection Pool                
            } 

            //console.log(sql);
            // connection.query(sql,[start_date, end_date], (error, result)=>{                 
            //     if(error) return reject(error);                  
            //     resolve(result);
            // });            
        // })
    },
    onFindLabOrder(value){
                
        if (!value) {
            return Promise.reject(new Error('Parameter is required'));
        }
        // console.log(value);
        let condition = "pt.hn = ?";
        let trem = value;        
        if(value.length > 9){
            condition = "pt.cid = ?";
        }else{            
            trem = value.padStart(9, '0')
        }
        return new Promise((resolve, reject)=>{
            const sql = `            
            SELECT 
                CONCAT(pt.pname, pt.fname, ' ', pt.lname) as fullname, 
                pt.cid, pt.sex,
                vn.vstdate,  
                lh.lab_order_number, 
                lh.vn, 
                lh.hn, 
                CONCAT(lh.order_date, ' ', lh.order_time) as order_date, 
                CONCAT(lh.receive_date, ' ', lh.receive_time) as receive_date, 
                CONCAT(lh.report_date, ' ', lh.report_time) as report_date, 
                lh.confirm_report, 
                lh.form_name, 
                lh.is_outlab
            FROM vn_stat as vn
            INNER JOIN lab_head as lh ON vn.vn = lh.vn
            INNER JOIN patient as pt ON pt.hn = lh.hn
            WHERE ${condition}
            ORDER BY vn.vstdate DESC
            `;
            console.log(sql);
            
            connection.query(sql,[trem],(error, results)=>{
                if (error) {
                    console.error('Error executing lab order query:', error);
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    onFindLabResult(value){
        const sql = `
        SELECT li.lab_items_code, li.lab_items_name
        , IF(li.lab_items_code = '68' AND lo.lab_order_result = 'Positive', 'Secret level',  lo.lab_order_result) as lab_order_result
        , li.lab_items_unit, li.lab_items_normal_value, li.lab_items_group, lig.lab_items_group_name FROM lab_order as lo
        INNER JOIN lab_items as li ON lo.lab_items_code = li.lab_items_code
        INNER JOIN lab_items_group lig ON li.lab_items_group = lig.lab_items_group_code
        WHERE lo.lab_order_number = ? 
        ORDER BY lig.lab_items_group_name ASC , li.lab_items_name ASC
        LIMIT 200
        `;
        return new Promise((resolve, reject)=>{
            connection.query(sql,[value],(error, results)=>{
                if (error) {
                    console.error('Error executing lab order query:', error);
                    return reject(error);
                }
                resolve(results);
            });
        });
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