const HttpErrors = require('http-errors');
const { errorOrFalse } = require('./SecurityHelper');
const SecurityService = require('./index');


module.exports = class extends SecurityService {
  static filterUnallowedProperties(place) {
    if (!place || typeof place !== 'object') {
      return null;
    }
    const allowedProps = [
      '_id',
      '__t',
      'name',
      'post',
      'images',
      'cover',
      'description',
      'link',
      'position',
      'path',
      'radius',
      'address',
      'type',
      'events',
      'prev',
      'next'
    ];
    Object.keys(place).forEach((key) => {
      if (!allowedProps.includes(key)) {
        delete place[key];
      }
    });
    return place;
  }

  static onlyValidPlace(req, throwError = true) {
    const place = req.body;
    if (!place || !place.categories || place.categories.length <= 0) {
      return errorOrFalse(HttpErrors.BadRequest(), throwError);
    }
    return true;
  }
};
