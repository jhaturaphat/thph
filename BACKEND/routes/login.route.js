const route = require('express').Router();
const {check} = require('express-validator');
const { onLogin } = require('../services/login.service');

route.post('/',[    
    check('userid').not().isEmpty(),
    check('pass').not().isEmpty()
], async (req, res)=>{
    try {
        req.validate();
        res.json(await onLogin(req.body));
    } catch (ex) {      
        console.log(ex);  
        res.error(ex);
    }    
})

module.exports = route;