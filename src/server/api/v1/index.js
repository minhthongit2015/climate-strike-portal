const router = require('express').Router();

const ServerStatusRoute = require('./api-info');
const ApiInfoRoute = require('./api-info');
const SessionsRoute = require('./sessions');

const MapRoute = require('./map');
const UsersRoute = require('./users');
const BlogRouter = require('./blog');

router.use('/server-status', ServerStatusRoute);
router.use('/api-info', ApiInfoRoute);
router.use('/sessions', SessionsRoute);

router.use('/map', MapRoute);
router.use('/users', UsersRoute);
router.use('/gardens', BlogRouter);

module.exports = router;
