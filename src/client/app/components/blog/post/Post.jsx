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
import DialogService from '../../../services/DialogService';
import PostDetails from './PostDetails';
import PostService from '../../../services/PostService';
import FbService from '../../../services/FbService';
import LikeAndShare from '../../facebook/LikeAndShare';


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

  componentDidUpdate() {
    FbService.parseButtons();
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
      url: PostService.buildPostUrl(post),
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
        <LikeAndShare
          data-href={PostService.buildPostUrl(post)}
          data-width={this.getSizeByClass(post.previewClass)}
        />
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
