const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const APIResponse = require('../../../models/api-models');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
const FacebookService = require('../../../services/thirt-party/Facebook');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyPublicOwnerModAdmin(req, req.body);
    req.body.newAuthor = req.session.user._id;
    const newPost = await PostService.create(req.body);
    res.send(new APIResponse().setData(newPost));
  }, { req, res });
});

router.get('/refresh-cache', (req, res) => {
  Logger.catch(async () => {
    const { url } = req.query;
    if (!url) {
      return res.send(APIResponse.throwError.BadRequest());
    }
    const cachedPost = await FacebookService.refreshCache(url);
    return res.send(new APIResponse().setData(cachedPost));
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
    const { postId } = req.params;
    const post = await PostService.get(postId);
    PostsSecurityService.onlyOwnerModAdmin(req, post);
    const deleteResult = await PostService.delete(postId);
    return res.send(new APIResponse().setData(deleteResult));
  }, { req, res });
});

module.exports = router;
