const { generateId } = require('./utils');
const { UserRole } = require('../../../utils/Constants');

const users = [
  {
    name: 'Trần Huyền Diệu',
    username: 'huyendieu',
    password: 'alphateam',
    role: UserRole.MODERATOR,
    socials: { facebook: '100010123869389' }
  },
  {
    name: 'Huỳnh Cao Hữu Linh',
    username: 'huulinh',
    password: 'alphateam',
    socials: { facebook: '100004405993641' }
  },
  {
    name: 'Nguyễn Thị Chung Trà',
    username: 'phatra',
    password: 'alphateam',
    socials: { facebook: '100008247301333' }
  },
  {
    name: 'Trần Nguyễn Diễm Linh',
    username: 'linhtran',
    password: 'alphateam',
    role: UserRole.MODERATOR,
    socials: { facebook: '100011207474424' }
  },
  {
    name: 'Đinh Thị Kim Loan',
    username: 'loankim',
    password: 'alphateam',
    socials: { facebook: '100005064845279' }
  },
  {
    name: 'Trần Nguyễn Minh Thông',
    username: 'thongtran',
    password: 'alphateam',
    role: UserRole.ADMIN,
    socials: { facebook: '948337288852312' }
  },
  {
    name: 'Nguyễn Tấn Đạt',
    username: 'tandat',
    password: 'alphateam',
    socials: { facebook: '100010377552925' }
  }
];
generateId(users, 100);

module.exports = users;
