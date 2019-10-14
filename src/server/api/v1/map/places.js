const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const PlaceService = require('../../../services/map/Place');
const MapSecurityService = require('../../../services/security/MapSecurity');

router.get('/:placeId', (req, res) => {
  Logger.catch(async () => {
    const { placeId } = req.params;
    const placeS = await PlaceService.getOrList(placeId, req.query);
    PlaceService.appendRelationshipByUser(placeS, req.session.user);
    return res.send(new APIResponse().setData(placeS));
  }, { req, res });
});

router.post('/', (req, res) => {
  Logger.catch(async () => {
    const place = MapSecurityService.filterUnallowedProperties(req.body);
    MapSecurityService.onlyModOrAdmin(req);

    PlaceService.createOrUpdate(place);
  }, { req, res });
});

module.exports = router;
