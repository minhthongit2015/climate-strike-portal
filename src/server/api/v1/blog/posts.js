const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const APIResponse = require('../../../models/api-models');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
const FacebookService = require('../../../services/thirt-party/Facebook');
const RatingService = require('../../../services/blog/Rating');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    const post = PostsSecurityService.filterUnallowedProperties(req.body);
    await PostsSecurityService.onlyPublicOwnerModAdmin(req, post);
    post.newAuthor = req.session.user._id;
    const newPost = await PostService.create(post);
    res.send(new APIResponse().setData(newPost));
  }, { req, res });
});

router.post('/:postId/rating', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const { postId } = req.params;
    const { rating } = req.body;
    const post = await PostService.get(postId);
    if (!post) {
      throw APIResponse.throwError.NotFound();
    }
    const ratingObject = await RatingService.rating(post, user, rating);
    if (user.dirty) {
      delete user.dirty;
      return req.session.save(
        () => res.send(new APIResponse().setData({ rating: ratingObject, user }))
      );
    }
    return res.send(new APIResponse().setData({ rating: ratingObject, user }));
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
    if (req.session.user) {
      if (postOrPosts.length == null) {
        await RatingService.appendRatingOfUser(postOrPosts, req.session.user);
      } else {
        await Promise.all(postOrPosts.map(
          post => RatingService.appendRatingOfUser(post, req.session.user)
        ));
      }
    }
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
