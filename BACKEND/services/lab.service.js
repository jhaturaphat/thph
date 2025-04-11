const connection = require('../configs/databases');
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
            trem = hn.padStart(9, '0')
        }
        return new Promise((resolve, reject) => {
            sql = `
            SELECT 
            CONCAT(pt.pname, pt.fname, ' ', pt.lname) as fullname
            ,IF(pt.sex = '1','ชาย','หญิง') as sex
            ,vn.age_y
            ,pt.hn, vn.vn
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

    onFindLabHead(vn){
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

        let labResult = [];
        return new Promise((resolve, reject)=>{
            connection.query(sql,[vn],(error, results)=>{
                if (error) {
                    console.error('Error executing lab order query:', error);
                    return reject(error);
                }
                
                let lab_result = results;
                results.forEach(element => {
                    const lab = this.onFindLabOrder(element.lab_order_number);
                    lab_result.map((item)=>{
                        return {...item,
                            lab_items: lab || []
                        }
                    })
                });
                 
                console.log(lab_result);
                resolve(results);
            });
        });
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

   /* onFindLabResult(value){
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
    },*/
    onFindAll(){
        return new Promise((resolve, reject)=>{
            connection.query(` `,(error, result)=>{
                if(error) reject(error);
                resolve(result);
            });
        })
    } 
}