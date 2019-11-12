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
    await MapSecurityService.onlyModOrAdmin(req);
    const { user } = req.session;
    const place = MapSecurityService.filterUnallowedProperties(req.body);
    const newPlace = await PlaceService.createOrUpdate(place, user);
    return res.send(APIResponse.setData(newPlace));
  }, { req, res });
});

router.delete('/:placeId', (req, res) => {
  Logger.catch(async () => {
    await MapSecurityService.onlyModOrAdmin(req);
    const { placeId } = req.params;
    const deletedPlace = await PlaceService.delete(placeId);
    return res.send(APIResponse.setData(deletedPlace));
  }, { req, res });
});

module.exports = router;
