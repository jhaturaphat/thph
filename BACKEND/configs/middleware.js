const {validationResult} = require("express-validator");


module.exports = function(req, res , next){

    //ตรวจสอบ validate
    req.validate = function(){
        const error = validationResult(req).array();
        if(error.length == 0) return;
        throw new Error(`${error[0].param} : ${error[0].msg}`);
    }

    // แสดงค่า error อกไป
    res.error = function(ex, status = 400){
        res.status(status).json({message:ex.message});
    }
    next();
}