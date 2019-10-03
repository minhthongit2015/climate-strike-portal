
const Logger = require('../services/Logger');
const FaceBookService = require('../services/user/Facebook');
const UserService = require('../services/user/User');

async function FacebookSession(req, res, next) {
  await Logger.catch(async () => {
    if (req.session && !req.session.fbUser) {
      const accessToken = req.headers.accesstoken;
      const fbUser = await FaceBookService.getUserByToken(accessToken);
      if (fbUser) {
        req.session.fbUser = fbUser;
      }
    }
    if (req.session && req.session.fbUser && !req.session.user) {
      const users = await UserService.list({
        limit: 1,
        where: {
          socials: { facebook: req.session.fbUser.id }
        }
      });
      if (users && users[0]) {
        [req.session.user] = users;
      }
    }
  });
  return next();
}

module.exports = FacebookSession;
