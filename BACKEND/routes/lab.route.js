const route = require('express').Router();
const {check} = require('express-validator');
const {onFind, onFindAll} = require('../services/lab.service');


route.post('/lab-view',[    
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
})

route.get('/findall',async(req, res)=>{
    try {
        res.json(await onFindAll());
    } catch (ex) {
        console.log(ex);  
        res.error(ex);
    }
})

module.exports = route;