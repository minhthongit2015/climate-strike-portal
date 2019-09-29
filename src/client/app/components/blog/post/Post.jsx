import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Card, CardHeader, CardBody, CardFooter, MDBCardImage,
  MDBPopover, MDBPopoverBody
} from 'mdbreact';
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
      createdAt = post.createdAt
    } = this.props;

    return (
      <Card className="post mt-3">
        <MDBPopover
          placement="top"
          trigger="focus"
          clickable={false}
          domElement
          popover
          id={_id}
        >
          <span className="post__preview">
            {preview
              ? <MDBCardImage className="img-fluid" src={preview} />
              : <CardHeader>{title}</CardHeader>}
          </span>
          <MDBPopoverBody>
            <div className="post__content">
              <ReactMarkdown
                className="markdown"
                source={content}
                escapeHtml={false}
              />
              <div className="post__summary">{summary}</div>
            </div>
          </MDBPopoverBody>
        </MDBPopover>
        <CardBody>
          {preview && <div className="post__title"><b>{title}</b></div>}
          {!preview && <div className="post__summary">{summary}</div>}
        </CardBody>
        <CardFooter>
          <TimeAgo time={createdAt} />
        </CardFooter>
      </Card>
    );
  }
}
