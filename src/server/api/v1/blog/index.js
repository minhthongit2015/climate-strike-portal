const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
// const Logger = require('../../../services/Logger');

const CategoriesRoute = require('./categories');
const PostsRoute = require('./posts');

router.use('/categories', CategoriesRoute);
router.use('/posts', PostsRoute);

module.exports = router;
