const route = require('express').Router();
const {check} = require('express-validator');
const {onFind, onFindLabOrder, onFindLabResult, onFindVisitList, onFindLabHead} = require('../services/lab.service');
const authorize = require("../middleware/middleware.authorization");

const role = ["create","read","update","delete"];

route.post('/lab-view',(authorize(role)),[    
    check('lab_start_date').not().isEmpty(),
    check('lab_end_date').not().isEmpty()
], async (req, res)=>{
    try {
        req.validate();
        res.json(await onFind(req.body));
    } catch (ex) {      
        console.log(ex);  
        res.error(ex);
    }    
});
// ดูวันที่สั่ง LAB
route.post('/lab-order', (authorize(role)),[
    check('oid').not().isEmpty(),
], async (req, res)=>{
    req.validate();
    res.json(await onFindLabOrder(req.body.oid));
});
// ดูรายการปล LAB
route.post('/lab-result',(authorize(role)),[
    check('id').not().isEmpty(),    
], async (req, res)=>{
    try {
        req.validate();
        res.json(await onFindLabResult(req.body.id));
    } catch (ex) {
        console.log(ex);  
        res.error(ex);
    }
});

route.post('/visit-list',(authorize(role)),[
    check('hn').not().isEmpty(),
], async (req, res)=> {
    req.validate();
    res.json(await onFindVisitList(req.body.hn));
});

route.post('/lab-head',(authorize(role)),[
    check('vn').not().isEmpty(),
], async (req, res)=> {
    req.validate();
    res.json(await onFindLabHead(req.body.vn));
});

module.exports = route;