const route = require('express').Router();

route.use('/gvmcar', require('./gvmcar.route'));

module.exports = route;