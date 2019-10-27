import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'mdbreact';
import './PostDetails.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import Video from '../../utils/video/Video';

export default React.memo((props) => {
  const {
    preview, video, title, summary, content, categories, createdAt
  } = props;
  return (
    <div className="post-details container">
      <Row>
        {(preview || video) && (
          <Col size="12" md="8" className="mb-3">
            <div className="post-details__categories mb-2 border-left pl-2">
              <span className="post-details__categories__label">Chuyên mục: </span>
              {categories.map(category => (
                <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
              ))}
            </div>
            {video ? (
              <Video alt={title} title={title} src={video} />
            ) : (
              <img alt={title} src={preview} className="w-100" />
            )}
          </Col>
        )}
        <Col size="12" md={preview ? '4' : '12'}>
          <div className="post-details__title">{title}</div>
          <sup key="1" className="post-details__time text-sm mr-2"><TimeAgo time={createdAt} /></sup>
          {!preview && (
            <React.Fragment>
              <sup key="2"> | </sup>
              <sup key="3" className="post-details__categories ml-2">
                <span className="post-details__categories__label">Chuyên mục: </span>
                {categories.map(category => (
                  <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
                ))}
              </sup>
            </React.Fragment>
          )}
          <hr className="my-3" />
          {summary && (
            <div className="post-details__summary mt-3">{summary}</div>
          )}
          <div className="post-details__content mt-3">
            <ReactMarkdown
              className="markdown"
              source={content}
            // escapeHtml={false} // Do not turn it on for now
            />
          </div>
        </Col>
      </Row>
    </div>
  );
});
