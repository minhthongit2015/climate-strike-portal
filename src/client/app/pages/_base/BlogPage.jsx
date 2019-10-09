import BasePage from './BasePage';
import PostService from '../../services/PostService';


export default class extends BasePage {
  componentDidMount() {
    super.componentDidMount();
    const params = new URLSearchParams(window.location.search);
    const hashtag = params.get('hashtag');
    if (hashtag) {
      PostService.fetchAndShowPost(hashtag);
      PostService.refreshCache();
    }
  }
}
