import React from 'react';
import NewPostRow from '../new-post/NewPostRow';
import UserService from '../../../services/UserService';


export default class extends React.Component {
  constructor(props) {
    super(props);
    UserService.useUserState(this);
  }

  render() {
    const { children } = this.props;
    const { user } = UserService;

    return (
      <React.Fragment>
        {user && (
          <NewPostRow onPosted={this.handlePostPosted} />
        )}
        {children}
      </React.Fragment>
    );
  }
}
