const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
// const Logger = require('../../../services/Logger');

const PostsRoute = require('./posts');

router.use('/posts', PostsRoute);

module.exports = router;
