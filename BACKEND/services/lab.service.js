const connection = require('../configs/databases');


module.exports = {
    onFind(value){        
        return new Promise((resolve, reject)=>{ 
            const start_date = value['lab_start_date'];
            const end_date = value['lab_end_date'];

            const diffInMs = new Date(end_date) - new Date(start_date);
            const diffDays = diffInMs / (1000 * 60 * 60 * 24);

            if(diffDays > 32) return reject({message:"ช่วงการดึงข้อมูลมากกว่า 31 วัน"});

            const sql = `             
            SELECT ll.*
            ,if(l3.lab_items_code = '225',l3.lab_order_result,'-') as HbA1C
            ,if(l4.lab_items_code = '222',l4.lab_order_result,'-') as Creatinine
            ,if(l5.lab_items_code = '1087',l5.lab_order_result,'-') as eGFR
            ,if(l6.lab_items_code = '39',l6.lab_order_result,'-') as Tri
            ,if(l7.lab_items_code = '853',l7.lab_order_result,'-') as LDL
            from(
            select h.vn,p.cid,p.pname,p.fname,p.lname,p.hn
            ,if(h.department='OPD',pt.name,pt2.name) as 'pttype'
            ,if(h.department='OPD',v.age_y,a.age_y) as 'age'
            ,ops.waist as "waist"
            ,ops.height, ops.bw
            ,ops.bmi as 'bmi',ops.bps as "SysBP", ops.bpd as "DiasBP"
            #,ops.cc, ops.hpi
            ,h.order_date
            #,k.department
            #,w.name as 'WARD_NAME'
            ,h.receive_date,h.receive_time
            ,h.report_date,h.report_time
            ,h.report_date as 'approve_date'

            from lab_head h

            left outer join lab_order l on l.lab_order_number=h.lab_order_number
            left outer join lab_items i on i.lab_items_code=l.lab_items_code
            left outer join patient p on p.hn=h.hn
            left outer join lab_items_sub_group g on l.lab_items_sub_group_code = g.lab_items_sub_group_code
            left outer join ovst o on h.vn = o.vn
            left outer join doctor d on d.code=h.doctor_code
            left outer join opduser op on h.reporter_name = op.loginname
            left outer join opduser op1 on h.approve_staff = op1.loginname
            left outer join vn_stat v on h.vn=v.vn
            left outer join an_stat a on h.vn=a.an
            left outer join ward w on w.ward = a.ward  
            left outer join pttype pt on pt.pttype=v.pttype
            left outer join pttype pt2 on pt2.pttype=a.pttype
            left outer join kskdepartment k on h.order_department=k.depcode
            left outer join lab_specimen_items s on i.specimen_code=s.specimen_code
            left outer join opdscreen ops on ops.vn=v.vn

            WHERE
            l.lab_items_code in ('225','222','1087','39','853') #LAB
            #and p.work_addr like 'รพร.เดชอุด%' 
            and unix_timestamp(h.order_date) BETWEEN unix_timestamp('${start_date}') and unix_timestamp('${end_date}')
            and length(h.vn)=12 
            and v.spclty='20'
            #and k.depcode='087'
            group by o.vn,a.an
            ) ll
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and unix_timestamp(lh.order_date) BETWEEN unix_timestamp('${start_date}') and unix_timestamp('${end_date}')
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '225'
            GROUP BY lh.vn,l.lab_items_code
            ) l3 on l3.vn = ll.vn
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and unix_timestamp(lh.order_date) BETWEEN unix_timestamp('${start_date}') and unix_timestamp('${end_date}')
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '222'
            GROUP BY lh.vn,l.lab_items_code
            ) l4 on l4.vn = ll.vn
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and unix_timestamp(lh.order_date) BETWEEN unix_timestamp('${start_date}') and unix_timestamp('${end_date}')
            # and l.lab_order_result <> ''   and l.confirm = 'Y'  
                AND l.lab_items_code  = '1087'
            GROUP BY lh.vn,l.lab_items_code
            ) l5 on l5.vn = ll.vn
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and unix_timestamp(lh.order_date) BETWEEN unix_timestamp('${start_date}') and unix_timestamp('${end_date}')
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '39'
            GROUP BY lh.vn,l.lab_items_code
            ) l6 on l6.vn = ll.vn
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and unix_timestamp(lh.order_date) BETWEEN unix_timestamp('${start_date}') and unix_timestamp('${end_date}')
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '853'
            GROUP BY lh.vn,l.lab_items_code
            ) l7 on l7.vn = ll.vn
            GROUP BY ll.vn
            ORDER BY ll.hn limit 10
            `;            
            connection.query(sql,[start_date, end_date], (error, result)=>{                
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