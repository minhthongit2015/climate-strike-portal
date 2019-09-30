const { generateId, mapParent } = require('./utils');

const categories = [
  {
    name: 'Bức tranh Trái Đất',
    type: 'EarthPicture'
  },
  {
    name: 'Khí hậu',
    type: 'Climate'
  },
  {
    name: 'Sinh vật',
    type: 'Organisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'Pollution'
  },

  {
    name: 'Điều bạn có thể làm',
    type: 'WhatYouCanDo'
  },
  {
    name: 'Tất cả',
    type: 'DoForEverything'
  },
  {
    name: 'Khí hậu',
    type: 'DoForClimate'
  },
  {
    name: 'Sinh vật',
    type: 'DoForOrganisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'DoForPollution'
  },

  {
    name: 'Điều bạn muốn biết?',
    type: 'YourQuestion'
  },
  {
    name: 'Khí hậu',
    type: 'AskForClimate'
  },
  {
    name: 'Sinh vật',
    type: 'AskForOrganisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'AskForPollution'
  },
  {
    name: 'Chủ đề khác',
    type: 'AskForOthers'
  }
];
generateId(categories, 200);
mapParent(categories, [
  [1, 2, 4]
]);
mapParent(categories, [
  [5, 6, 8]
]);
mapParent(categories, [
  [9, 10, 12]
]);

module.exports = categories;
