import React from 'react';
import NewPostRow from '../new-post/NewPostRow';
import UserService from '../../../services/UserService';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostPosted = this.handlePostPosted.bind(this);
    UserService.useUserState(this);
  }

  handlePostPosted() {
    this.forceUpdate();
  }

  render() {
    const { children, categories, rootCategory } = this.props;
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
        {children}
      </React.Fragment>
    );
  }
}
