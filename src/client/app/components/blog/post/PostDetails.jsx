import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'mdbreact';
import './PostDetails.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';


export default React.memo(props => (
  <div className="post-details container">
    <Row>
      {props.preview && (
        <Col size="8">
          <img alt={props.title} src={props.preview} />
        </Col>
      )}
      <Col size={props.preview ? '4' : '12'}>
        <div className="post-details__title">{props.title}</div>
        <sup className="post-details__time text-sm"><TimeAgo time={props.createdAt} /></sup>
        <div className="post-details__summary mt-4">{props.summary}</div>
        <div className="post-details__content mt-5">
          <ReactMarkdown
            className="markdown"
            source={props.content}
            escapeHtml={false}
          />
        </div>
      </Col>
    </Row>
  </div>
));
