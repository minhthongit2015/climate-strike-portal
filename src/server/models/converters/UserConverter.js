const Converter = require('./converter');

module.exports = class extends Converter {
  static convert(object) {
    if (!object) return object;
    const rawUser = JSON.parse(JSON.stringify(object));
    return {
      _id: rawUser._id,
      name: rawUser.name,
      socials: rawUser.socials,
      role: rawUser.role
    };
  }
};
