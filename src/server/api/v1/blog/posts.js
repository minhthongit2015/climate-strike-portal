const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const APIResponse = require('../../../models/api-models');
const SecurityService = require('../../../services/Security');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    SecurityService.onlyModOrAdmin(req);
    const { draft } = req.query;
    if (draft) {
      req.body.status = 'draft';
    }
    const post = await PostService.create(req.body);
    return res.send(new APIResponse().setData(post));
  }, { req, res });
});

router.get('/:postId?', (req, res) => {
  Logger.catch(async () => {
    const { postId } = req.params;
    const postOrPosts = await PostService.getOrList(postId, req.query);
    return res.send(new APIResponse().setData(postOrPosts));
  }, { req, res });
});

router.delete('/:postId', (req, res) => {
  Logger.catch(async () => {
    SecurityService.onlyModOrAdmin(req);
    const { postId } = req.params;
    const deleteResult = await PostService.delete(postId);
    return res.send(new APIResponse().setData(deleteResult));
  }, { req, res });
});

module.exports = router;
