import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'mdbreact';
import './PostDetails.scss';


export default React.memo(props => (
  <div className="post-details container">
    <Row>
      <Col size="8">
        <img alt={props.title} src={props.preview} />
      </Col>
      <Col size="4">
        <div className="post-details__title">{props.title}</div>
        <div className="post-details__summary mt-2">{props.summary}</div>
        <div className="post-details__content mt-3">
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
