import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Card, CardHeader, CardBody, CardFooter, MDBCardImage,
  MDBPopover, MDBPopoverBody
} from 'mdbreact';
import classnames from 'classnames';
import './Post.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import ContextButton from '../../utils/context-button/ContextButton';
import superrequest from '../../../utils/superrequest';
import PostService from '../../../services/PostService';
import FbService from '../../../services/FbService';
// import LikeAndShare from '../../facebook/LikeAndShare';
import UserService from '../../../services/UserService';
import MessageDialogService from '../../../services/MessageDialogService';
import ShareButton from '../../facebook/ShareButton';
import LoginDialogService from '../../../services/LoginDialogService';

const AllCtxOptions = {
  edit: { label: 'chỉnh sửa bài viết', value: 'update' },
  delete: { label: 'xóa bài viết', value: 'delete' },
  request: { label: 'đề xuất chỉnh sửa', value: 'request-update' },
  save: { label: 'lưu bài viết', value: 'save-post' }
};

const ownerCtxOptions = [
  AllCtxOptions.edit,
  AllCtxOptions.delete,
  AllCtxOptions.save
];
const adminCtxOptions = [
  ...ownerCtxOptions
];
const moderatorCtxOptions = [
  ...ownerCtxOptions
];
const normalUserCtxOptions = [
  AllCtxOptions.request,
  AllCtxOptions.save
];
const noLoginCtxOptions = [
  AllCtxOptions.request
];

/**
 * 1. Admin sẽ có tất cả quyền của owner
 * 2. Moderator hiện sẽ có tất cả quyền của owner
 * 3. Owner sẽ có quyền "Sửa", "Xóa", "Lưu"
 * 4. Normal User sẽ có "Đề xuất sửa", "Lưu"
 */
function getContextOptions(post) {
  if (UserService.isAdmin) {
    return adminCtxOptions;
  }
  if (UserService.isModerator) {
    return moderatorCtxOptions;
  }
  if (UserService.isOwner(post)) {
    return ownerCtxOptions;
  }
  if (UserService.isNormalUser) {
    return normalUserCtxOptions;
  }
  return noLoginCtxOptions;
}

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

  componentDidUpdate() {
    FbService.parseButtons();
  }

  togglePopup() {
    this.setState(prevState => ({
      clickable: !prevState.clickable,
      isVisible: !prevState.isVisible
    }));
    const { post } = this.props;
    PostService.openPostDetailsNewTab(post);
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
    if (option.value === 'request-update') {
      if (UserService.isLoggedIn) {
        return MessageDialogService.show(
          'Have a nice day! /=)',
          'Sẽ thật tốt nếu bạn có thể thử lại tính năng này sau, tính năng hiện vẫn đang được xây dựng...'
        );
      }
      return LoginDialogService.open();
    }
    if (option.value === 'save-post') {
      return MessageDialogService.show(
        'Wait me a second /=)',
        'Sẽ thật tốt nếu bạn có thể thử lại tính năng này sau, tính năng hiện vẫn đang được xây dựng...'
      );
    }
    if (option.value === 'delete') {
      if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
        return null;
      }
      const { post } = this.props;
      return superrequest.agentDelete(`/api/v1/blog/posts/${post._id}`)
        .then(() => {
          this.props.handleActions(event, { value: 'delete-done' }, this.props.post, this);
        });
    }
    if (this.props.handleActions) {
      return this.props.handleActions(event, option, this.props.post, this);
    }
    return null;
  }

  renderPreviewAsImage() {
    const { post } = this.props;
    const {
      preview = post.preview
    } = this.props;
    return (
      <div onClick={this.togglePopup}>
        <MDBCardImage
          className="img-fluid post__preview-image"
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
  getSizeByClass(className) {
    switch (className) {
    case 'w1':
      return window.innerWidth * 0.1259150805270864;
    case 'w2':
      return 150;
      // return window.innerWidth * 0.29941434846266474;
    case 'w3':
      return 150;
      // return window.innerWidth;
    default:
      return window.innerWidth * 0.1259150805270864;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderSocials() {
    const { post } = this.props;
    return (
      <div className="d-flex">
        {/* <LikeAndShare
          data-href={PostService.buildPostUrl(post)}
          data-width={this.getSizeByClass(post.previewClass)}
        /> */}
        <ShareButton url={PostService.buildPostUrl(post)} />
      </div>
    );
  }

  render() {
    let { post = {} } = this.props;
    const {
      _id = post._id,
      preview = post.preview,
      title = post.title,
      summary = post.summary,
      content = post.content,
      category = post.categories[0].type,
      createdAt = post.createdAt,
      authors = post.authors
    } = this.props;
    const {
      clickable,
      isVisible
    } = this.state;
    post = {
      _id,
      preview,
      title,
      summary,
      content,
      category,
      createdAt,
      authors
    };
    const contextOptions = getContextOptions(post);

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
            {contextOptions && (
              <div className="post__context-btn">
                <ContextButton options={contextOptions} hanlder={this.handleContextActions} />
              </div>
            )}
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
            {this.renderSocials()}
          </div>
          <div className="">
            <TimeAgo time={createdAt} />
          </div>
        </CardFooter>
      </Card>
    );
  }
}
