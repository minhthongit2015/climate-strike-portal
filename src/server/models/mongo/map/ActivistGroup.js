
const mongoose = require('mongoose');
const Place = require('./_Place');

const { ObjectId } = mongoose.Schema.Types;

const ActivistGroupSchema = new mongoose.Schema({
  members: [{ type: ObjectId, ref: 'User' }], // Danh sách thành viên
  leaders: [{ type: ObjectId, ref: 'User' }] // Những người dẫn đầu
});

const ActivistGroupModel = Place.discriminator('ActivistGroup', ActivistGroupSchema);

module.exports = ActivistGroupModel;
