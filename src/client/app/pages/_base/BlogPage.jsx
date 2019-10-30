import BasePage from './BasePage';
import PostService from '../../services/PostService';
import SavedPostsDialogService from '../../services/SavedPostsDialogService';
// import NewsTracker from '../../services/NewsTracker';


export default class extends BasePage {
  componentDidMount() {
    super.componentDidMount();
    const params = new URLSearchParams(window.location.search);

    const isShowSavedPost = params.get('saved-posts');
    if (isShowSavedPost) {
      SavedPostsDialogService.openSavedPostsInCurrentHistory();
    }

    const hashtag = params.get('hashtag');
    if (hashtag) {
      PostService.openPostDetailsCurrentTab(hashtag);
      PostService.refreshCache();
    }

    // NewsTracker.checkUnreadPosts();
  }
}
