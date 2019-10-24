import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'mdbreact';
import './PostDetails.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';


export default React.memo(props => (
  <div className="post-details container">
    <Row>
      {props.preview && (
        <Col size="12" md="8" className="mb-3">
          <div className="post-details__categories mb-2 border-left pl-2">
            <span className="post-details__categories__label">Chuyên mục: </span>
            {props.categories.map(category => (
              <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
            ))}
          </div>
          <img alt={props.title} src={props.preview} className="w-100" />
        </Col>
      )}
      <Col size="12" md={props.preview ? '4' : '12'}>
        <div className="post-details__title">{props.title}</div>
        <sup className="post-details__time text-sm mr-2"><TimeAgo time={props.createdAt} /></sup>
        {!props.preview && (
          <React.Fragment>
            <sup> | </sup>
            <sup className="post-details__categories ml-2">
              <span className="post-details__categories__label">Chuyên mục: </span>
              {props.categories.map(category => (
                <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
              ))}
            </sup>
          </React.Fragment>
        )}
        <hr className="my-3" />
        {props.summary && (
          <div className="post-details__summary mt-3">{props.summary}</div>
        )}
        <div className="post-details__content mt-3">
          <ReactMarkdown
            className="markdown"
            source={props.content}
            // escapeHtml={false} // Do not turn it on for now
          />
        </div>
      </Col>
    </Row>
  </div>
));
