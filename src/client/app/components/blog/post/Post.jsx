import React from 'react';
import './Post.scss';

export default class extends React.Component {
  render() {
    const { post } = this.props;
    const {
      preview = post.preview,
      title = post.title,
      description = post.description
    } = this.props;

    return (
      <div>
        <div className="post__preview">{preview}</div>
        <div className="post__title">{title}</div>
        <div className="post__description">{description}</div>
      </div>
    );
  }
}
