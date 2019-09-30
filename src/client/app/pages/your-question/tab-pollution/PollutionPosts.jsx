import EarthPicturePosts from '../tab-your-question/YourQuestionPosts';


export default class PollutionPosts extends EarthPicturePosts {
  constructor(props) {
    super(props);
    this.category = 'AskForPollution';
  }
}
