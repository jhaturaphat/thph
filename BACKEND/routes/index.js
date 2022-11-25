const route = require('express').Router();

route.use('/his/lab', require('./lab.route'));

module.exports = route;