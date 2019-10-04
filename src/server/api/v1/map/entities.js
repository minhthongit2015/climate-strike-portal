const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const MapService = require('../../../services/map');

router.get('/list', (req, res) => {
  Logger.catch(async () => {
    const { limit, offset, sort } = req.query;
    const entities = await MapService.list({
      limit, offset, sort
    });
    const { user } = req.session;
    if (user) {
      entities.filter(entity => entity.users.includes(user._id))
        .forEach((entity) => {
          entity.owned = true;
        });
    }
    return res.send(new APIResponse().setData({ entities }));
  }, { req, res });
});

module.exports = router;
