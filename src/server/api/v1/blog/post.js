const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostsService = require('../../../services/blog/Posts');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    const posts = await PostsService.create(req.body);
    res.send(posts);
  }, { req, res });
});

router.get('/', (req, res) => {
  Logger.catch(async () => {
    const posts = await PostsService.list({});
    res.send(posts);
  }, { req, res });
});

module.exports = router;
