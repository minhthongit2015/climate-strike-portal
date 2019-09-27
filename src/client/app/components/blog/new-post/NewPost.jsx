import React from 'react';
import {
  MDBInput, MDBCard, MDBCardHeader, MDBCardBody,
  Button,
  Row, Col
} from 'mdbreact';
import classnames from 'classnames';
// eslint-disable-next-line no-unused-vars
import ReactMarkdown from 'react-markdown';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import superrequest from '../../../utils/superrequest';
import LeafLoading from '../../utils/loadings/LeafLoading';
import Composer from '../composer/Composer';


export default class extends React.Component {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();

    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);


    this.state = {
      title: '',
      description: '',
      disabled: false
    };
  }

  handlePostSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      disabled: true
    });
    const { title, description } = this.state;
    const content = this.contentRef.current.value;
    superrequest.post('/api/blog', {
      body: { title, content, description }
    }).finally(() => {
      this.setState({
        disabled: false
      });
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log('render "components/blog/new-post"');
    const {
      title, description, disabled
    } = this.state;
    return (
      <MDBCard className={classnames('new-post overlapable', { disabled })}>
        <MDBCardHeader className="d-flex justify-content-between py-0">
          <div className="flex-fill d-flex align-items-center">Đăng bài mới</div>
          <Button color="" className="px-3 py-2" tabIndex="-1">
            <i className="far fa-window-close" />
          </Button>
        </MDBCardHeader>
        <MDBCardBody>
          <form onSubmit={this.handlePostSubmit}>
            <Row>
              <Col>
                <MDBInput
                  label="Tiêu đề"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                  autocomplete="off"
                  autofill="off"
                />
                <MDBInput
                  label="Mô tả ngắn gọn"
                  type="textarea"
                  rows="3"
                  name="description"
                  value={description}
                  onChange={this.handleInputChange}
                  autocomplete="off"
                  autofill="off"
                />
              </Col>
              <Col>
                <DropUploader
                  className="px-2 py-4"
                />
              </Col>
            </Row>
            <Composer ref={this.contentRef} />
            {/* <ReactMarkdown className="markdown" source={this.content} /> */}
            <Row>
              <Col className="text-right">
                <Button type="submit" size="sm" color="none">Bỏ</Button>
                <Button type="submit" size="sm" color="none">Lưu bản nháp</Button>
                <Button type="submit" size="sm">Đăng bài</Button>
              </Col>
            </Row>
          </form>
        </MDBCardBody>
        <LeafLoading overlaping={disabled} />
      </MDBCard>
    );
  }
}
