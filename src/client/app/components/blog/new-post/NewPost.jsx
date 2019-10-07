import React from 'react';
import {
  MDBInput, MDBCard, MDBCardHeader, MDBCardBody,
  Button,
  Row, Col
} from 'mdbreact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classnames from 'classnames';
import './NewPost.scss';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import superrequest from '../../../utils/superrequest';
import LeafLoading from '../../utils/loadings/LeafLoading';
import Composer from '../composer/Composer';
import ButtonBar from '../../dialog/ButtonBar';
import CategoryHelper from '../../../utils/CategoryHelper';

const animatedComponents = makeAnimated();

export default class extends React.Component {
  get post() {
    const {
      title, summary, preview, category
    } = this.state;
    const content = this.contentRef.current.value;
    const categoryIds = category.map(cate => cate.value);
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
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.resetForm = this.resetForm.bind(this);

    this.state = {
      title: '',
      summary: '',
      preview: '',
      category: [],
      disabled: false,
      expanded: false
    };

    CategoryHelper.useCategoriesState(this);
  }

  setPost(post) {
    this.setState({
      title: post.title,
      summary: post.summary,
      preview: post.preview,
      category: CategoryHelper.categories.filter(cat => post.categories.includes(cat.value))
    });
    this.contentRef.current.value = post.content;
  }

  handlePostSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const postData = this.post;
    if (postData.categories.length <= 0) {
      alert('Vui lòng chọn "Chuyên mục" cho bài viết');
      return;
    }
    const isDraft = document.activeElement.value === 'draft';
    if (isDraft) {
      postData.status = 'draft';
    }
    this.setLoadingState(true);
    superrequest.agentPost('/api/v1/blog/posts', postData)
      .then((res) => {
        if (res && res.ok) {
          this.dispatchPostPostedEvent(res.data);
          this.resetForm();
        }
      })
      .catch((error) => {
        alert(`Xảy ra lỗi trong quá trình đăng bài! Xin vui lòng thử lại!\r\nChi tiết: "${error.code} - ${error.message}"`);
      })
      .finally(() => {
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
      category: value
    });
  }

  handleButtonClick(event) {
    if (event.target.name === 'close') {
      this.resetForm();
    }
    this.toggleExpand();
  }

  resetForm() {
    this.setState({
      title: '',
      summary: '',
      preview: '',
      category: []
    });
    this.contentRef.current.value = '';
  }

  toggleExpand() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  dispatchPostPostedEvent(postedPost) {
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
      title, summary, preview, category, disabled, expanded
    } = this.state;
    const { categories, rootCategory } = this.props;
    let categoryOptions = [];
    if (rootCategory) {
      categoryOptions = CategoryHelper.getLeafCategoriesAsOptions(rootCategory);
    }
    if (categories) {
      categoryOptions = CategoryHelper.getCategoriesAsOptions(categories);
    }

    return (
      <MDBCard className={classnames('new-post overlapable flex-fill', { disabled, expanded })}>
        <MDBCardHeader className="d-flex justify-content-between py-0">
          <div className="flex-fill d-flex align-items-center">Đăng bài mới</div>
          <ButtonBar
            onClick={this.handleButtonClick}
            closeState={expanded ? 1 : 2}
            minimizeState={expanded ? 1 : 2}
          />
        </MDBCardHeader>
        <MDBCardBody>
          <form onSubmit={this.handlePostSubmit}>
            <Row>
              <Col>
                <Select
                  placeholder="Chuyên mục"
                  name="category"
                  options={categoryOptions}
                  isMulti
                  value={category}
                  // defaultValue={categoryOptions[0]}
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
                <Button type="button" size="sm" color="none" onClick={this.resetForm}>Bỏ</Button>
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
