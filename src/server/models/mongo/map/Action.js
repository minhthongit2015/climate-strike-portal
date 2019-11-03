
const mongoose = require('mongoose');
const Place = require('./_Place');

const ActionSchema = new mongoose.Schema({
  type: String // Trồng rừng, Năng lượng sạch, Dọn rác, Cấm nhà máy, Giảm giao thông
});

const ActionModel = Place.discriminator('Action', ActionSchema);

module.exports = ActionModel;
