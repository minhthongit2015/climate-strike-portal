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
    name: 'Khí hậu',
    type: 'ForClimate'
  },
  {
    name: 'Sinh vật',
    type: 'ForOrganisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'ForPollution'
  },

  {
    name: 'Điều bạn muốn biết?',
    type: 'YourQuestion'
  },
  {
    name: 'Khí hậu',
    type: 'QClimate'
  },
  {
    name: 'Sinh vật',
    type: 'QOrganisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'QPollution'
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
