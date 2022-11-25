const route = require('express').Router();

route.use('/login',require('./login.route'));
route.use('/his/lab', require('./lab.route'));

module.exports = route;