
const Logger = require('../services/Logger');
const FaceBookService = require('../services/user/Facebook');
const UserService = require('../services/user/User');

function FacebookSession(req, res, next) {
  if (!next) {
    next = res;
  }
  Logger.catch(async () => {
    let hasChange = false;
    try {
      if (req.session && !req.session.fbUser && req.headers && req.headers.accesstoken) {
        const fbUser = await FaceBookService.getUserByToken(req.headers.accesstoken);
        if (fbUser) {
          req.session.fbUser = fbUser;
          hasChange = true;
        }
      }
      if (req.session && !req.session.user && req.session.fbUser) {
        const users = await UserService.list({
          limit: 1,
          where: {
            socials: { facebook: req.session.fbUser.id }
          }
        });
        if (users && users[0]) {
          [req.session.user] = users;
          hasChange = true;
        }
      }
    } catch (error) {
      // Just let it get through
    }
    if (hasChange) {
      req.session.save(() => {
        next();
      });
    } else {
      next();
    }
  });
}

module.exports = FacebookSession;
