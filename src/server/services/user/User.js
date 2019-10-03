const { User } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ConverterFactory = require('../../models/converters/converter-factory');
const { isBlank } = require('../../utils');

module.exports = class extends CRUDService {
  static get model() {
    return User;
  }

  static async create({
    email, password, name, ...rest
  }) {
    if (isBlank(email) || isBlank(password) || isBlank(name)) {
      return null;
    }
    const userToSave = {
      email, password, name, ...rest
    };
    const newUser = await User.findOne({ email })
      .then(user => user || user.create({ userToSave })).exec();
    return ConverterFactory.get('user').convert(newUser);
  }

  static async updatePassword({ email, oldPassword, newPassword }) {
    if (isBlank(email) || isBlank(oldPassword) || isBlank(newPassword)) {
      return null;
    }
    const [numberOfAffectedRows, affectedRows] = await User.update({
      password: newPassword
    }, {
      where: {
        email,
        password: oldPassword
      },
      returning: true,
      plain: true
    });
    if (numberOfAffectedRows <= 0) {
      return null;
    }

    const updatedUser = affectedRows[0];
    return ConverterFactory.get('user').convert(updatedUser);
  }

  static async updateUserRole(userId, newRole) {
    if (isBlank(userId) || isBlank(newRole)) {
      return null;
    }

    const [numberOfAffectedRows, affectedRows] = await User.update({
      newRole,
      where: {
        Id: userId
      }
    });

    if (numberOfAffectedRows < 0) {
      return null;
    }

    const updatedUser = affectedRows[0];
    return ConverterFactory.get('user').convert(updatedUser);
  }
};
