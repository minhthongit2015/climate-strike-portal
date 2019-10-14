const router = require('express').Router();
const PlacesRoute = require('./places');

router.use('/places', PlacesRoute);

module.exports = router;
