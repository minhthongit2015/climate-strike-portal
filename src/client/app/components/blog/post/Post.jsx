import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Card, CardHeader, CardBody, CardFooter, MDBCardImage,
  MDBPopover, MDBPopoverBody,
  MDBBtn
} from 'mdbreact';
import classnames from 'classnames';
import './Post.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import ContextButton from '../../utils/context-button/ContextButton';
import superrequest from '../../../utils/superrequest';
import DialogService from '../../../services/DialogService';
import PostDetails from './PostDetails';


const contextOptions = [
  { label: 'chỉnh sửa bài viết', value: 'update' },
  { label: 'xóa bài viết', value: 'delete' }
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
    this.handlePopupChange = this.handlePopupChange.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);

    this.state = {
      clickable: false,
      isVisible: false
    };
  }

  togglePopup() {
    this.setState(prevState => ({
      clickable: !prevState.clickable,
      isVisible: !prevState.isVisible
    }));
    const { post } = this.props;
    DialogService.setContent(<PostDetails {...this.props.post} />);
    DialogService.toggle();
    DialogService.setHistory({
      url: `${window.location.href}?hashtag=${post.baseOrder}`,
      title: post.title,
      state: post
    });
  }

  handlePopupChange(state) {
    if (!state) {
      this.setState({
        clickable: false,
        isVisible: false
      });
    }
  }

  handleContextActions(event, option) {
    event.preventDefault();
    if (option.value === 'delete') {
      if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
        return;
      }
      const { post } = this.props;
      superrequest.agentDelete(`/api/v1/blog/posts/${post._id}`)
        .then(() => {
          this.props.handleActions(event, { value: 'delete-done' }, this.props.post, this);
        });
    }
    if (this.props.handleActions) {
      this.props.handleActions(event, option, this.props.post, this);
    }
  }

  renderPreviewAsImage() {
    const { post } = this.props;
    const {
      preview = post.preview
    } = this.props;
    return (
      <div onClick={this.togglePopup}>
        <MDBCardImage
          className="img-fluid"
          src={preview}
        />
      </div>
    );
  }

  renderPreviewAsTitle() {
    const { post } = this.props;
    const {
      title = post.title,
      category = post.categories[0].type
    } = this.props;
    return (
      <CardHeader className={category} onClick={this.togglePopup}>{title}</CardHeader>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderSocials() {
    return (
      <div>
        <div className="d-flex justify-content-around">
          <MDBBtn size="sm" gradient="blue" className="px-2 py-1 text-pre-wrap">400 likes...</MDBBtn>
          <MDBBtn size="sm" gradient="blue" className="px-2 py-1 text-pre-wrap">chia sẻ</MDBBtn>
        </div>
      </div>
    );
  }

  render() {
    const { post } = this.props;
    const {
      _id = post._id,
      preview = post.preview,
      title = post.title,
      summary = post.summary,
      content = post.content,
      category = post.categories[0].type,
      createdAt = post.createdAt
    } = this.props;
    const {
      clickable,
      isVisible
    } = this.state;

    return (
      <Card className="post">
        <MDBPopover
          placement="top"
          clickable={clickable}
          isVisible={isVisible}
          domElement
          popover
          onChange={this.handlePopupChange}
          id={_id}
        >
          <span className={`post__preview ${preview ? category : ''}`}>
            {preview
              ? this.renderPreviewAsImage()
              : this.renderPreviewAsTitle()}
            <div className="post__context-btn">
              <ContextButton options={contextOptions} hanlder={this.handleContextActions} />
            </div>
          </span>
          <MDBPopoverBody>
            <div className="post__content">
              <ReactMarkdown
                className="markdown"
                source={content}
                escapeHtml={false}
              />
            </div>
          </MDBPopoverBody>
        </MDBPopover>
        <CardBody className={classnames({ 'p-0': !preview && !summary })}>
          {preview && <div className="post__title"><b>{title}</b></div>}
          {summary && <div className="post__summary mt-2">{summary}</div>}
        </CardBody>
        <CardFooter className="d-flex align-items-center justify-content-stretch flex-wrap">
          <div className="flex-fill">
            <TimeAgo time={createdAt} />
          </div>
          {this.renderSocials()}
        </CardFooter>
      </Card>
    );
  }
}
