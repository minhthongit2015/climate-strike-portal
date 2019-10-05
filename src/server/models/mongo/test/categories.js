const { generateId, mapParent } = require('./utils');

const categories = [
  { type: 'EarthPicture', name: 'Bức tranh Trái Đất' },
  { type: 'Climate', name: 'Khí hậu' },
  { type: 'Organisms', name: 'Sinh vật' },
  { type: 'Pollution', name: 'Ô nhiễm' },

  { type: 'WhatYouCanDo', name: 'Điều bạn có thể làm' },
  { type: 'DoForClimate', name: 'Cho khí hậu' },
  { type: 'DoForOrganisms', name: 'Cho sinh vật' },
  { type: 'DoForPollution', name: 'Giảm Ô nhiễm' },
  { type: 'DoSupporting', name: 'Hỗ trợ các phong trào' },
  { type: 'WorldActions', name: 'Thế giới đang hành động' },

  { type: 'YourQuestion', name: 'Điều bạn muốn biết?' },
  { type: 'AskForClimate', name: 'Hỏi về khí hậu' },
  { type: 'AskForOrganisms', name: 'Hỏi về sinh vật' },
  { type: 'AskForPollution', name: 'Hỏi về ô nhiễm' },
  { type: 'AskForOthers', name: 'Hỏi chủ đề khác' }
];

generateId(categories, 200);
mapParent(categories, [
  [1, 2, 4]
]);
mapParent(categories, [
  [5, 6, 10]
]);
mapParent(categories, [
  [11, 12, 15]
]);

module.exports = categories;
