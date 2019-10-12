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
import UserService from '../../../services/UserService';
import LoginDialogService from '../../../services/LoginDialogService';
import MessageDialogService from '../../../services/MessageDialogService';

const animatedComponents = makeAnimated();
const scrollToTop = () => {
  const scrollBox = document.getElementById('sidebar-layout__content');
  scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
};
export default class extends React.Component {
  get post() {
    const {
      _id, title, summary, preview, category
    } = this.state;
    const content = this.contentRef.current.value;
    const categoryIds = category.map(cate => cate.value);
    return {
      _id, title, summary, content, preview, categories: categoryIds
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
    this.close = this.close.bind(this);

    this.state = {
      _id: null,
      title: '',
      summary: '',
      preview: '',
      category: [],
      disabled: false,
      expanded: false
    };

    CategoryHelper.useCategoriesState(this);
  }

  close() {
    this.setState({
      expanded: false
    });
  }

  resetAndClose() {
    this.setState({
      _id: null,
      title: '',
      summary: '',
      preview: '',
      category: [],
      expanded: false
    });
    this.contentRef.current.value = '';
  }

  resetForm() {
    this.setState({
      _id: null,
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

  setPost(post) {
    const postCategories = post.categories.map(cat => cat.type);
    const category = CategoryHelper.categoryArray.filter(cat => postCategories.includes(cat.value));
    this.setState({
      expanded: true
    }, () => {
      this.setState({
        _id: post._id,
        title: post.title,
        summary: post.summary,
        preview: post.preview
      });
      this.contentRef.current.value = post.content;
      setTimeout(() => {
        scrollToTop();
        this.setState({
          category
        });
      }, 200);
    });
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
          this.resetAndClose();
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
    if (!UserService.user) {
      LoginDialogService.open();
    } else if (!this.props.hasPermission) {
      MessageDialogService.show(
        'Tham Gia Viết Bài',
        <div>
          Để tham gia cùng viết bài, bạn có thể liên hệ qua Facebook page <a href="https://www.facebook.com/Climate-Strike-Vietnam-101448167939446" target="_blank" rel="noopener noreferrer">Climate Strike Vietnam</a>
        </div>
      );
    } else {
      this.toggleExpand();
    }
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
      _id, title, summary, preview, category, disabled, expanded
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
              <Col size="12" sm="6">
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
              <Col size="12" sm="6">
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
                <Button type="submit" size="sm">
                  {!_id ? 'Đăng bài' : 'Cập nhập'}
                </Button>
              </Col>
            </Row>
          </form>
        </MDBCardBody>
        <LeafLoading text="đang đăng bài..." overlaping={disabled} />
      </MDBCard>
    );
  }
}
