import React from 'react';
import {
  MDBInput, MDBCard, MDBCardHeader, MDBCardBody,
  Button,
  Row, Col
} from 'mdbreact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classnames from 'classnames';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import superrequest from '../../../utils/superrequest';
import LeafLoading from '../../utils/loadings/LeafLoading';
import Composer from '../composer/Composer';

const animatedComponents = makeAnimated();

export default class extends React.Component {
  get post() {
    const {
      title, summary, preview, categories
    } = this.state;
    const content = this.contentRef.current.value;
    const categoryIds = categories.map(category => category.value);
    return {
      title, summary, content, preview, categories: categoryIds
    };
  }

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);

    this.categories = [
      // {
      //   name: 'Bức tranh Trái Đất',
      //   type: 'EarthPicture'
      // },
      {
        label: 'Khí hậu',
        value: 'Climate'
      },
      {
        label: 'Sinh vật',
        value: 'Organisms'
      },
      {
        label: 'Ô nhiễm',
        value: 'Pollution'
      }
    ];

    this.state = {
      title: '',
      summary: '',
      preview: '',
      categories: [],
      disabled: false
    };
  }

  handlePostSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const isDraft = document.activeElement.value === 'draft';
    this.setLoadingState(true);
    superrequest.post(`/api/v1/blog/posts?draft=${isDraft}`, this.post)
      .then((res) => {
        if (res.ok) {
          this.triggerPostPosted(res.data);
        }
      }).finally(() => {
        this.setLoadingState(false);
      });
  }

  handleInputChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  handleCategoryChange(value) {
    this.setState({
      categories: value
    });
  }

  triggerPostPosted(postedPost) {
    if (this.props.onPosted) {
      this.props.onPosted(postedPost);
    }
  }

  setLoadingState(isLoading) {
    this.setState({
      disabled: isLoading
    });
  }

  render() {
    console.log('render "components/blog/new-post"');
    const {
      title, summary, preview, categories, disabled
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
                <Select
                  placeholder="Chuyên mục"
                  name="category"
                  options={this.categories}
                  isMulti
                  value={categories}
                  onChange={this.handleCategoryChange}
                  required
                  autoComplete="off"
                  autofill="off"
                  components={animatedComponents}
                />
                <MDBInput
                  label="Tiêu đề"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                  autoComplete="off"
                  autofill="off"
                  required
                />
                <MDBInput
                  label="Mô tả ngắn gọn"
                  name="summary"
                  value={summary}
                  onChange={this.handleInputChange}
                  type="textarea"
                  rows="2"
                  autoComplete="off"
                  autofill="off"
                />
              </Col>
              <Col>
                <DropUploader
                  label="Tải ảnh xem trước"
                  name="preview"
                  value={preview}
                  onChange={this.handleInputChange}
                  className="px-2 pb-4 pt-1"
                />
              </Col>
            </Row>
            <Composer ref={this.contentRef} />
            <Row>
              <Col className="text-right">
                <Button type="button" size="sm" color="none">Bỏ</Button>
                <Button type="submit" name="submit" value="draft" size="sm" color="none">Lưu bản nháp</Button>
                <Button type="submit" size="sm">Đăng bài</Button>
              </Col>
            </Row>
          </form>
        </MDBCardBody>
        <LeafLoading text="đang đăng bài..." overlaping={disabled} />
      </MDBCard>
    );
  }
}
