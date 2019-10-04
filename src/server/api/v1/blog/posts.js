const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostsService = require('../../../services/blog/Posts');
const APIResponse = require('../../../models/api-models');
const ImgurService = require('../../../services/thirt-party/imgur');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    const { preview } = req.body;
    const album = await ImgurService.createAlbum();
    const img = await ImgurService.create(preview, album.body.data.deletehash);
    if (img && true) {
      return res.send('ok');
    }
    const post = await PostsService.create(req.body);
    return res.send(new APIResponse().setData(post));
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
