
const defaultModel = {
  url: 'https://climate-strike-vietnam.herokuapp.com',
  title: 'Climate Strike Vietnam',
  description: 'Phong trào tham gia chống biến đổi khí hậu tại Việt Nam',
  image: 'https://climate-strike-vietnam.herokuapp.com/Climate-Strike-Vietnam.jpg',
  site_name: 'Climate Strike Vietnam',
  type: 'website',
  app_id: '415534815831116'
};

function getModel() {
  return JSON.parse(JSON.stringify(defaultModel));
}

function buildModel(model = defaultModel) {
  return Object.assign(getModel(), model);
}

module.exports = {
  defaultModel,
  getModel,
  buildModel
};
