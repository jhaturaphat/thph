const {connection} = require('../configs/databases');
const { splitDateRange, fetchData } = require('../services/fn/lab.query');

module.exports = {
    //ใส่่ 000000000 หน้า HN ให้ครบ 9 หลัก
    formatHn(hn) {
        return hn.padStart(9, '0');
    },
    async onFind (value){        
        
            const start_date = value['lab_start_date'];
            const end_date = value['lab_end_date'];
            const stepDays = 1;
            // console.log(start_date, ' ถึง ', end_date); 
            const diffInMs = new Date(end_date) - new Date(start_date);
            const diffDays = diffInMs / (1000 * 60 * 60 * 24);
            
            if(diffDays > 32) return new Promise((resolve, reject) => {
                reject({message:"ช่วงการดึงข้อมูลมากกว่า 31 วัน"});
            });
            // แบ่งช่วงเวลา
            const dateRanges = splitDateRange(start_date, end_date, stepDays);
            //  console.log(dateRanges);
           
            try {
                // console.log('Start fetching data');
        
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

    },

    onFindVisitList(hn){
        if(!hn) return Promise.reject(new Error('HN:Parameter is required'));
        
        let trem = hn;   
        let condition = "pt.hn = ?";     
        if(trem.length > 9){
            // กำหนดเขื่อนไขให้ค้นหาจาก CID
            condition = "pt.cid = ?";
        }else{      
            //ใส่่ 000000000 หน้า HN ให้ครบ 9 หลัก     
            trem = hn.padStart(9, '0');
        }
        // const patient = 
        return new Promise((resolve, reject) => {
            sql = `
            SELECT 
            CONCAT(pt.pname, pt.fname, ' ', pt.lname) as fullname
            ,IF(pt.sex = '1','ชาย','หญิง') as sex
            ,vn.age_y
            ,pt.hn ,vn.vn
            ,DATE_FORMAT(vn.vstdate, '%Y-%m-%d') AS vstdate
            ,ov.vsttime
            ,IF(lh.lab_order_number != "",'Y','N') as 'status'
            FROM vn_stat as vn 
            INNER JOIN patient as pt ON vn.hn = pt.hn
            INNER JOIN ovst as ov ON vn.vn = ov.vn
            LEFT JOIN lab_head as lh ON vn.vn = lh.vn
            WHERE ${condition}
            GROUP BY vn.vn
            ORDER BY vn.vn DESC
            `;
           
            connection.query(sql,[trem],(error, results)=>{
                if (error) {
                    console.error('Error executing lab order query:', error);
                    return reject(error);
                }
                // console.log(results);                
                resolve(results);
            });
        });
    },

    async  onFindLabHead(vn){
        if(!vn) return Promise.reject(new Error('VN:Parameter is required'));

        sql = `
        SELECT 
        lab_order_number,
        CONCAT(lh.order_date, ' ', lh.order_time) as order_date, 
        CONCAT(lh.receive_date, ' ', lh.receive_time) as receive_date, 
        CONCAT(lh.report_date, ' ', lh.report_time) as report_date, 
        lh.confirm_report, 
        lh.form_name, 
        lh.is_outlab
        FROM lab_head as lh 
        WHERE lh.vn = ?
        `;

        try {
            // ดึงข้อมูล lab_head
            const results = await new Promise((resolve, reject) => {
                connection.query(sql, [vn], (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                });
            });
    
            // ดึง lab_items สำหรับแต่ละ lab_order_number พร้อมกัน
            const labItemsPromises = results.map(ele => 
                module.exports.onFindLabitem(ele.lab_order_number)
            );
            console.log(labItemsPromises);
            
            const labItemsResults = await Promise.all(labItemsPromises);
    
            // รวมข้อมูล
            const labResult = results.map((item, index) => ({
                ...item,
                lab_items: labItemsResults[index] || []
            }));
            // console.log(labResult);
            
            return labResult;
        } catch (error) {
            console.error('Error in onFindLabHead:', error);
            throw error;
        }
        
    },

    onFindLabitem(labOrderNumber) {
        return new Promise((resolve, reject) => {
            const sql = `            
                SELECT  
                  lo.lab_order_number
                , lo.lab_items_code 
                , lo.lab_items_name_ref
                , lo.lab_order_result
                , lo.lab_items_normal_value_ref
                , lo.abnormal_result
                , lo.confirm
                FROM lab_order as lo WHERE lo.lab_order_number = ?;
            `;
            connection.query(sql, [labOrderNumber], (error, results) => {
                if (error) {
                    reject(error);
                } else {                    
                    const processedResults = results.map(row => {
                        return {
                            ...row,
                            lab_order_result: this.transformLabResult(row)
                        };
                    });
                    resolve(processedResults);
                }
            });
        });
    },

    transformLabResult(row) {
        const { lab_items_code, lab_order_result } = row;    
        // เงื่อนไขเดิม: ถ้า code 68 และเป็น Positive ให้ปิดความลับ
        if (lab_items_code === '68' && lab_order_result === 'Positive') {
            return 'Secret level';
        }  
        if (lab_items_code === '206' && lab_order_result === 'Positive') {
            return 'Secret level';
        }         
        return lab_order_result;
    },

    onFindLabOrder(oid){
                
        if (!oid) {
            return Promise.reject(new Error('Lab order number:Parameter is required'));
        }
        
        return new Promise((resolve, reject)=>{
            const sql = `            
            SELECT  
             lo.lab_order_number
            ,lo.lab_items_name_ref
            ,IF(lo.lab_items_code = '68' AND lo.lab_order_result = 'Positive', 'Secret level',  lo.lab_order_result) as lab_order_result
            ,lo.lab_items_normal_value_ref
            ,lo.abnormal_result
            ,lo.confirm
            FROM lab_order as lo WHERE lo.lab_order_number = ?;
            `;
            // console.log(sql);
            
            connection.query(sql,[oid],(error, results)=>{
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