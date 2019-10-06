import React from 'react';
import NewPostRow from '../new-post/NewPostRow';
import UserService from '../../../services/UserService';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.postListRef = React.createRef();
    this.handlePostPosted = this.handlePostPosted.bind(this);
    UserService.useUserState(this);
  }

  handlePostPosted() {
    if (this.postListRef.current.innerRef.current.refresh) {
      this.postListRef.current.innerRef.current.refresh();
    }
  }

  render() {
    const {
      categories, rootCategory, PostList, ...restProps
    } = this.props;
    const { user } = UserService;

    return (
      <React.Fragment>
        {user && (
          <NewPostRow
            onPosted={this.handlePostPosted}
            rootCategory={rootCategory}
            categories={categories}
          />
        )}
        <PostList ref={this.postListRef} {...restProps} />
      </React.Fragment>
    );
  }
}
