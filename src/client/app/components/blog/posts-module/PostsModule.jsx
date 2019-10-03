import React from 'react';
import NewPostRow from '../new-post/NewPostRow';
import GlobalState from '../../../utils/GlobalState';


export default class extends React.Component {
  constructor(props) {
    super(props);
    GlobalState.useState('user2', null, this);
  }

  render() {
    const { children } = this.props;
    const { user2 } = GlobalState;

    return (
      <React.Fragment>
        {user2 && (
          <NewPostRow onPosted={this.handlePostPosted} />
        )}
        {children}
      </React.Fragment>
    );
  }
}
