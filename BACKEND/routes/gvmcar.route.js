const route = require('express').Router();
const {check} = require('express-validator');
const {onReserve} = require('../services/gvmcar.service');


route.post('/reserve',[
    check('gvmcar_rsv_num_of_ple','กรุณากรอกข้อมูล').not().isEmpty(),
    check('gvmcar_rsv_trip_job').not().isEmpty(),
    check('gvmcar_rsv_trip_detail').not().isEmpty(),
    check('gvmcar_rsv_start_date').not().isEmpty(),
    check('gvmcar_rsv_end_date').not().isEmpty()
], async (req, res)=>{
    try {
        req.validate();
        res.json(await onReserve(req.body));
    } catch (ex) {
        res.error(ex);
    }    
})

module.exports = route;