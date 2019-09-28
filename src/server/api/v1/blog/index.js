const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
// const Logger = require('../../../services/Logger');

const PostRoute = require('./post');

router.use('/post', PostRoute);

module.exports = router;
