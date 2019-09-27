import React from 'react';
import {
  MDBInput, MDBCard, MDBCardHeader, MDBCardBody,
  Button,
  Row, Col
} from 'mdbreact';

import { Editor } from '@toast-ui/react-editor';

import superrequest from '../../../utils/superrequest';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();

    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      title: '',
      description: '',
      content: ''
    };

    this.contentConfig = {
      previewStyle: 'tab',
      height: '350px',
      initialEditType: 'wysiwyg',
      useCommandShortcut: true,
      exts: [
        {
          name: 'chart',
          minWidth: 100,
          maxWidth: 600,
          minHeight: 100,
          maxHeight: 300
        },
        'scrollSync',
        'colorSyntax',
        'uml',
        'mark',
        'table'
      ]
    };
  }

  handlePostSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const { title, content, description } = this.state;
    superrequest.post('/api/blog', {
      body: { title, content, description }
    });
  }

  handleInputChange(event) {
    if (!event.source) {
      const { target } = event;
      const { name, value } = target;
      this.setState({
        [name]: value
      });
    } else {
      const inst = this.contentRef.current.getInstance();
      this.setState({
        content: inst.getValue()
      });
    }
  }

  render() {
    const { title, description, content } = this.state;
    return (
      <MDBCard className="new-post">
        <MDBCardHeader className="d-flex justify-content-between py-0">
          <div className="flex-fill d-flex align-items-center">Đăng bài mới</div>
          <Button color="gray" className="rounded-circle p-2" tabIndex="-1">
            <i className="far fa-window-close" />
          </Button>
        </MDBCardHeader>
        <MDBCardBody>
          <form onSubmit={this.handlePostSubmit}>
            <MDBInput
              label="Tiêu đề"
              name="title"
              value={title}
              onChange={this.handleInputChange}
            />
            <MDBInput
              label="Mô tả"
              name="description"
              value={description}
              onChange={this.handleInputChange}
            />
            <Editor
              ref={this.contentRef}
              {...this.contentConfig}
              name="content"
              initialValue={content}
              onChange={this.handleInputChange}
            />
            <Row>
              <Col className="text-right">
                <Button type="submit" size="sm">Đăng Bài</Button>
              </Col>
            </Row>
          </form>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
