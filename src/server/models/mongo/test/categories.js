const { generateId, mapParent } = require('./utils');

const categories = [
  { type: 'EarthPicture', name: 'Bức tranh Trái Đất' },
  { type: 'Climate', name: 'Khí hậu' },
  { type: 'Organisms', name: 'Sinh vật' },
  { type: 'Pollution', name: 'Ô nhiễm' },

  { type: 'WhatYouCanDo', name: 'Điều bạn có thể làm' },
  { type: 'DoForEverything', name: 'Cho tất cả' },
  { type: 'DoForClimate', name: 'Cho khí hậu' },
  { type: 'DoForOrganisms', name: 'Cho sinh vật' },
  { type: 'DoForPollution', name: 'Giảm Ô nhiễm' },

  { type: 'YourQuestion', name: 'Điều bạn muốn biết?' },
  { type: 'AskForClimate', name: 'Về khí hậu' },
  { type: 'AskForOrganisms', name: 'Về sinh vật' },
  { type: 'AskForPollution', name: 'Về ô nhiễm' },
  { type: 'AskForOthers', name: 'Chủ đề khác' }
];

generateId(categories, 200);
mapParent(categories, [
  [1, 2, 4]
]);
mapParent(categories, [
  [5, 6, 9]
]);
mapParent(categories, [
  [10, 11, 14]
]);

module.exports = categories;
