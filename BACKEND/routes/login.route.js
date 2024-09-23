const route = require('express').Router();
const {check} = require('express-validator');
const { onLogin, onLoginAttempts } = require('../services/login.service');
const authorize = require("../middleware/middleware.authorization");

const role = ["create","read","update","delete"];

route.post('/',[    
    check('userid').not().isEmpty(),
    check('pass').not().isEmpty()
], async (req, res)=>{    
    try {
        req.validate();
        res.json(await onLoginAttempts(req.body));
    } catch (ex) {      
        console.log(ex);  
        res.error(ex);
    }    
});

route.post('/reqlogin',(authorize(role)),[] ,async (req, res)=>{
    try {        
        res.json({"ok":true});
    } catch (ex) {                
        res.error(ex);
    }   
});


module.exports = route;