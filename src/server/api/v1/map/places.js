const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const PlaceService = require('../../../services/map/Place');
const MapSecurityService = require('../../../services/security/MapSecurity');

router.get('/:placeId?', (req, res) => {
  Logger.catch(async () => {
    const { placeId } = req.params;
    const places = await PlaceService.getOrList(placeId, req.query);
    return res.send(APIResponse.setData(places));
  }, { req, res });
});

router.post('/', (req, res) => {
  Logger.catch(async () => {
    const place = MapSecurityService.filterUnallowedProperties(req.body);
    await MapSecurityService.onlyModOrAdmin(req);

    const newPlace = await PlaceService.createOrUpdate(place);
    return res.send(APIResponse.setData(newPlace));
  }, { req, res });
});

module.exports = router;
