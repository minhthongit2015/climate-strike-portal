
const { Entity } = require('../../models/mongo');
const CRUDService = require('../CRUDService');


module.exports = class extends CRUDService {
  static get model() {
    return Entity;
  }
};
