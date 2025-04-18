const connection = require('../../configs/databases');

module.exports = {
    // ฟังก์ชัน Query ข้อมูลในแต่ละช่วงเวลา
    fetchData(range) {
        // return console.log(range);
        return new Promise((resolve, reject) => {
            const query = `             
            SELECT ll.*
            ,if(l3.lab_items_code = '225',l3.lab_order_result,'-') as HbA1C
            ,if(l4.lab_items_code = '222',l4.lab_order_result,'-') as Creatinine
            ,if(l5.lab_items_code = '1087',l5.lab_order_result,'-') as eGFR
            ,if(l6.lab_items_code = '39',l6.lab_order_result,'-') as Tri
            ,if(l7.lab_items_code = '853',l7.lab_order_result,'-') as LDL
            ,if(l8.lab_items_code = '36',l8.lab_order_result,'-') as HDL
            ,if(l9.lab_items_code = '699',l9.lab_order_result,'-') as 'FBS'

            FROM(

            select h.vn,p.cid,p.pname,p.fname,p.lname,p.hn
            ,if(h.department='OPD',pt.name,pt2.name) as 'pttype'
            ,if(h.department='OPD',v.age_y,a.age_y) as 'age'
            ,ops.waist as "waist"
            ,ops.height, ops.bw
            ,ops.bmi as 'bmi',ops.bps as "SysBP", ops.bpd as "DiasBP"
            #,ops.cc, ops.hpi
            ,DATE_FORMAT(h.order_date,'%Y-%m-%d') as order_date
            #,k.department
            #,w.name as 'WARD_NAME'
            ,DATE_FORMAT(h.receive_date,'%Y-%m-%d') as receive_date,h.receive_time
            ,DATE_FORMAT(h.report_date,'%Y-%m-%d') as report_date,h.report_time
            ,DATE_FORMAT(h.report_date,'%Y-%m-%d') as 'approve_date'

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

            l.lab_items_code in ('225','222','1087','39','36','853', '699') #LAB
            #and p.work_addr like 'รพร.เดชอุด%' 
            and h.order_date BETWEEN ? and ?
            and length(h.vn)=12 
            and v.spclty='20'
            #and k.depcode='087'
            group by o.vn,a.an
            ) ll
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and lh.order_date BETWEEN ? and ?
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '225'
            GROUP BY lh.vn,l.lab_items_code
            ) l3 on l3.vn = ll.vn
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and lh.order_date BETWEEN ? and ?
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '222'
            GROUP BY lh.vn,l.lab_items_code
            ) l4 on l4.vn = ll.vn
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and lh.order_date BETWEEN ? and ?
            # and l.lab_order_result <> ''   and l.confirm = 'Y'  
                AND l.lab_items_code  = '1087'
            GROUP BY lh.vn,l.lab_items_code
            ) l5 on l5.vn = ll.vn
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and lh.order_date BETWEEN ? and ?
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '39'
            GROUP BY lh.vn,l.lab_items_code
            ) l6 on l6.vn = ll.vn    
            LEFT OUTER JOIN (
            select lh.vn,l.lab_items_code,l.lab_order_result
            from lab_head lh 
            LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
            where  l.lab_order_result is not null  and lh.order_date BETWEEN ? and ?
            #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                AND l.lab_items_code = '853'
            GROUP BY lh.vn,l.lab_items_code
            ) l7 on l7.vn = ll.vn
            LEFT OUTER JOIN (
                select lh.vn,l.lab_items_code,l.lab_order_result
                from lab_head lh 
                LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
                where  l.lab_order_result is not null  and lh.order_date BETWEEN ? and ?
                #and l.lab_order_result <> ''   and l.confirm = 'Y'   
                    AND l.lab_items_code = '36'
                GROUP BY lh.vn,l.lab_items_code
                ) l8 on l8.vn = ll.vn
            LEFT OUTER JOIN (
                select lh.vn,l.lab_items_code,l.lab_order_result
                from lab_head lh
                LEFT OUTER JOIN lab_order l on l.lab_order_number = lh.lab_order_number
                where  l.lab_order_result is not null  and lh.order_date BETWEEN ? and ?
                #and l.lab_order_result <> ''   and l.confirm = 'Y'
                    AND l.lab_items_code = '699'
                GROUP BY lh.vn,l.lab_items_code
                ) l9 on l9.vn = ll.vn
            #ORDER BY ll.hn limit 10
            `;   
            // let start_date = range.start;
            // let end_date = range.end;
            connection.query(query, [
                range.start, range.end, // For main query
                range.start, range.end, // For l3
                range.start, range.end, // For l4
                range.start, range.end, // For l5
                range.start, range.end, // For l6
                range.start, range.end, // For l7
                range.start, range.end, // For l8
                range.start, range.end  // For l9
            ], (err, results) => {
                if (err) {
                    connection.end(); // ปิด Connection Pool 

                    return reject(err); // ส่ง error กลับ
                }
                // connection.end(); // ปิด Connection Pool 
                resolve(results); // ส่งผลลัพธ์กลับ
            });
        });
    },
    // ฟังก์ชันแบ่งช่วงเวลา
    splitDateRange(startDate, endDate, stepDays) {
        const ranges = [];
        let currentStart = new Date(startDate);
        const end = new Date(endDate);

        while (currentStart <= end) {
            const currentEnd = new Date(currentStart);
            currentEnd.setDate(currentEnd.getDate() + stepDays - 1);

            if (currentEnd > end) currentEnd.setTime(end.getTime());

            ranges.push({
                start: currentStart.toISOString().slice(0, 10),
                end: currentEnd.toISOString().slice(0, 10),
            });

            currentStart.setDate(currentStart.getDate() + stepDays);
        }

        return ranges;
    },
    
};