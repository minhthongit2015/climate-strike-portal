const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostsService = require('../../../services/blog/Posts');
const APIResponse = require('../../../models/api-models');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    const post = await PostsService.create(req.body);
    res.send(new APIResponse().setData(post));
  }, { req, res });
});

router.get('/:postId?', (req, res) => {
  Logger.catch(async () => {
    const { postId } = req.params;
    const postOrPosts = await PostsService.getOrList(postId, req.query);
    return res.send(new APIResponse().setData(postOrPosts));
  }, { req, res });
});

router.delete('/:postId', (req, res) => {
  Logger.catch(async () => {
    const { postId } = req.params;
    const deleteResult = await PostsService.delete(postId);
    return res.send(new APIResponse().setData(deleteResult));
  }, { req, res });
});

module.exports = router;
