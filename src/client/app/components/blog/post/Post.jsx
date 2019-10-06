import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Card, CardHeader, CardBody, CardFooter, MDBCardImage,
  MDBPopover, MDBPopoverBody
} from 'mdbreact';
import classnames from 'classnames';
import './Post.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';


export default class extends React.Component {
  render() {
    const { post } = this.props;
    const {
      _id = post._id,
      preview = post.preview,
      title = post.title,
      summary = post.summary,
      content = post.content,
      category = post.categories[0].type,
      createdAt = post.createdAt
    } = this.props;

    return (
      <Card className="post">
        <MDBPopover
          placement="top"
          clickable={false}
          domElement
          popover
          id={_id}
        >
          <span className={`post__preview ${preview ? category : ''}`}>
            {preview
              ? <MDBCardImage className="img-fluid" src={preview} />
              : <CardHeader className={category}>{title}</CardHeader>}
          </span>
          <MDBPopoverBody>
            <div className="post__content">
              <ReactMarkdown
                className="markdown"
                source={content}
                escapeHtml={false}
              />
            </div>
          </MDBPopoverBody>
        </MDBPopover>
        <CardBody className={classnames({ 'p-0': !preview && !summary })}>
          {preview && <div className="post__title"><b>{title}</b></div>}
          {summary && <div className="post__summary">{summary}</div>}
        </CardBody>
        <CardFooter>
          <TimeAgo time={createdAt} />
        </CardFooter>
      </Card>
    );
  }
}
