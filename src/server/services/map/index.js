const EntityService = require('../../services/map/Entity');
const ApiHelper = require('../../utils/ApiHelper');
const CRUDService = require('../CRUDService');

module.exports = class extends CRUDService {
  static async list(opts = ApiHelper.listParams) {
    return EntityService.list(opts);
  }
};
