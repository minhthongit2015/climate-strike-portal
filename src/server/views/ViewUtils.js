
const defaultModel = {
  url: 'https://climate-strike-vietnam.herokuapp.com',
  title: 'Climate Strike Vietnam',
  description: 'Trang thông tin về chống biến đổi khí hậu.',
  image: 'https://climate-strike-vietnam.herokuapp.com/BetterWorld-w1024.png',
  site_name: 'Climate Strike Vietnam',
  type: 'website',
  app_id: '415534815831116'
};

function buildModel(model = defaultModel) {
  return Object.assign(defaultModel, model);
}

module.exports = {
  defaultModel,
  buildModel
};
