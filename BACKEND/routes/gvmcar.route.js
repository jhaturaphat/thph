const route = require('express').Router();
const {check} = require('express-validator');
const {onRevSave, onFindAll} = require('../services/gvmcar.service');


route.post('/reserve',[
    check('gvmcar_rsv_num_of_ple','กรุณากรอกข้อมูล').not().isEmpty(),
    check('gvmcar_rsv_trip_job').not().isEmpty(),
    check('gvmcar_rsv_trip_detail').not().isEmpty(),
    check('gvmcar_rsv_start_date').not().isEmpty(),
    check('gvmcar_rsv_end_date').not().isEmpty()
], async (req, res)=>{
    try {
        req.validate();
        res.json(await onRevSave(req.body));
    } catch (ex) {      
        console.log({Error:ex.sqlMessage});  
        res.error(ex);
    }    
})

route.get('/findall',async(req, res)=>{
    try {
        res.json(await onFindAll());
    } catch (error) {
        console.log({Error:ex.sqlMessage});  
        res.error(ex);
    }
})

module.exports = route;