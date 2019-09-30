const { generateId } = require('./utils');

const users = [
  {
    name: 'Trần Huyền Diệu',
    username: 'huyendieu',
    password: 'alphateam',
    socials: { fb: '100010123869389' }
  },
  {
    name: 'Huỳnh Cao Hữu Linh',
    username: 'huulinh',
    password: 'alphateam',
    socials: { fb: '100004405993641' }
  },
  {
    name: 'Nguyễn Thị Chung Trà',
    username: 'phatra',
    password: 'alphateam',
    socials: { fb: '100008247301333' }
  },
  {
    name: 'Trần Nguyễn Diễm Linh',
    username: 'linhtran',
    password: 'alphateam',
    socials: { fb: '100011207474424' }
  },
  {
    name: 'Đinh Thị Kim Loan',
    username: 'loankim',
    password: 'alphateam',
    socials: { fb: '100005064845279' }
  },
  {
    name: 'Trần Nguyễn Minh Thông',
    username: 'thongtran',
    password: 'alphateam',
    socials: { fb: '100010281495813' }
  },
  {
    name: 'Nguyễn Tấn Đạt',
    username: 'tandat',
    password: 'alphateam',
    socials: { fb: '100010377552925' }
  }
];
generateId(users, 100);

module.exports = users;
