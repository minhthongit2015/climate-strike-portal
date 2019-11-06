
const Converter = require('./converter');
const UserConverter = require('./UserConverter');
const RatingConverter = require('./RatingConverter');
const PlaceConverter = require('./PlaceConverter');

const ConverterMap = {
  User: UserConverter,
  Rating: RatingConverter,
  Place: PlaceConverter
};

module.exports = class {
  static get(name) {
    return ConverterMap[name] || Converter;
  }
};
