import React from 'react';
import { Row, Col } from 'mdbreact';
import NewPost from './NewPost';

export default props => (
  <Row>
    <Col size={12} className="d-flex justify-content-end">
      <NewPost {...props} />
    </Col>
  </Row>
);
