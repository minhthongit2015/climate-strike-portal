import React from 'react';
import NewPostRow from '../new-post/NewPostRow';
import UserService from '../../../services/UserService';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.postListRef = React.createRef();
    this.newPostRef = React.createRef();
    this.handlePostPosted = this.handlePostPosted.bind(this);
    this.handleActions = this.handleActions.bind(this);
    UserService.useUserState(this);
  }

  handlePostPosted() {
    if (this.postListRef.current.innerRef.current.refresh) {
      this.postListRef.current.innerRef.current.refresh();
    }
  }

  handleActions(event, option, post, postComponent) {
    if (option.value === 'update') {
      this.newPostRef.current.setPost(post, postComponent);
    }
    if (option.value === 'delete-done') {
      this.handlePostPosted();
    }
  }

  render() {
    const {
      categories, rootCategory, PostList, everyoneCanPost, ...restProps
    } = this.props;
    const { user } = UserService;
    const canCreateNewPost = user
      && (['admin', 'moderator'].includes(user.role) || everyoneCanPost);

    return (
      <React.Fragment>
        {canCreateNewPost && (
          <NewPostRow
            ref={this.newPostRef}
            onPosted={this.handlePostPosted}
            rootCategory={rootCategory}
            categories={categories}
          />
        )}
        <PostList ref={this.postListRef} handleActions={this.handleActions} {...restProps} />
      </React.Fragment>
    );
  }
}
