const router = require('express').Router();
// const path = require('path');
const Debugger = require('../services/Debugger');
const Logger = require('../services/Logger');
// const serverConfig = require('../config');
const PostService = require('../services/blog/Post');
const PlaceService = require('../services/map/Place');
const { buildModel, getModel } = require('../views/ViewUtils');
const getTitleByUrl = require('./CategoryTitleMap');

router.get('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

router.get('*', (req, res) => {
  Logger.catch(async () => {
    Debugger.httpRouting('Routing: ', req.sessionID,
      (req.session && req.session.user) ? req.session.user.name : '');

    // const indexPath = path.resolve(serverConfig.publicFolder, 'index.html');
    // res.sendFile(indexPath);

    let model = getModel();
    // const port = req.connection.localPort !== 80
    //   ? `:${req.connection.localPort}`
    //   : '';
    const url = `https://${req.hostname}${req.url}`;
    if (req.query && req.query.hashtag) {
      const post = await PostService.getByOrder(req.query.hashtag);
      if (!post) {
        return res.redirect('/');
      }
      model = buildModel({
        url,
        title: post.title || model.title,
        description: post.summary || model.description,
        image: post.preview || model.image
      });
      return res.render('index', model);
    }

    if (req.query.place) {
      const place = await PlaceService.getByOrder(req.query.place);
      if (!place) {
        return res.redirect('/');
      }
      if (place.post) {
        model = buildModel({
          url,
          title: place.post.title || model.title,
          description: place.post.summary || model.description,
          image: place.post.preview || model.image
        });
      } else if (place.__t === 'Activist') {
        const { description, user, author } = place;
        const {
          name = '', socials: { facebook } = {}
        } = user || author || {};
        const avatar = facebook && `https://graph.facebook.com/${facebook}/picture?type=square&width=200&height=200`;
        model = buildModel({
          url,
          title: name || model.title,
          description: description || 'Cá nhân hoạt động vì môi trường',
          image: avatar || model.image
        });
      } else {
        model = buildModel({
          url,
          title: place.name || model.title,
          description: place.description || model.description,
          image: place.cover || (place.images && place.images[0]) || model.image
        });
      }
      return res.render('index', model);
    }

    const titleByCategory = getTitleByUrl(req.path);
    model = buildModel({
      url,
      title: titleByCategory ? `${titleByCategory} | ${model.title}` : model.title
    });
    return res.render('index', model);
  }, () => {
    res.redirect('/');
  });
});

module.exports = router;
