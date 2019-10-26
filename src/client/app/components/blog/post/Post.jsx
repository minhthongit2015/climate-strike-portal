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
// import LikeAndShare from '../../facebook/LikeAndShare';
import UserService from '../../../services/UserService';
import MessageDialogService from '../../../services/MessageDialogService';
import ShareButton from '../../facebook/ShareButton';
import LoginDialogService from '../../../services/LoginDialogService';
import Rating from '../../utils/rating/Rating';
import CategoryService from '../../../services/CategoryService';
import { IconBookmark } from '../../../../assets/icons';

const ContextOptions = {
  iWillDoThis: {
    label: (
      <span role="img" className="i-will-do-this" aria-label="i-do" aria-labelledby="i-do">
        ✊ Thêm vào điều tôi sẽ làm
      </span>
    ),
    value: 'i-will-do-this'
  },
  edit: { label: 'chỉnh sửa bài viết', value: 'update' },
  delete: { label: 'xóa bài viết', value: 'delete' },
  request: { label: 'đề xuất chỉnh sửa', value: 'request-update' },
  save: { label: 'lưu bài viết', value: 'save-post' }
};

const ownerCtxOptions = [
  ContextOptions.save,
  ContextOptions.edit,
  ContextOptions.delete
];
const adminCtxOptions = [
  ...ownerCtxOptions
];
const moderatorCtxOptions = [
  ...ownerCtxOptions
];
const normalUserCtxOptions = [
  ContextOptions.save,
  ContextOptions.request
];
const noLoginCtxOptions = [
  ContextOptions.request,
  ContextOptions.save
];

const whatYouCanDoCtxOptions = [
  ContextOptions.iWillDoThis
];

/**
 * 1. Admin sẽ có tất cả quyền của owner
 * 2. Moderator hiện sẽ có tất cả quyền của owner
 * 3. Owner sẽ có quyền "Sửa", "Xóa", "Lưu"
 * 4. Normal User sẽ có "Đề xuất sửa", "Lưu"
 */
function getContextOptions(post) {
  let options = [];
  if (UserService.isAdmin) {
    options = adminCtxOptions;
  } else if (UserService.isModerator) {
    options = moderatorCtxOptions;
  } else if (UserService.isOwner(post)) {
    options = ownerCtxOptions;
  } else if (UserService.isNormalUser) {
    options = normalUserCtxOptions;
  } else {
    options = noLoginCtxOptions;
  }
  if (CategoryService.isBelongsToCategory(post, 'WhatYouCanDo')
    || CategoryService.isBelongsToCategory(post, 'CommunityRecommend')) {
    return [...whatYouCanDoCtxOptions, ...options];
  }
  return options;
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
    this.handlePopupChange = this.handlePopupChange.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);
    this.handleRating = this.handleRating.bind(this);

    this.state = {
      clickable: false,
      isVisible: false
    };
  }

  togglePopup() {
    const { post } = this.props;
    PostService.openPostDetailsDialog(post);
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
    const { post } = this.props;
    switch (option) {
    case ContextOptions.request:
      if (UserService.isLoggedIn) {
        return MessageDialogService.showUpComingFeature(option.value);
      }
      return LoginDialogService.open();

    case ContextOptions.save:
      this.props.handleActions(event, {
        value: 'remove-saved-post'
      }, post, this);
      return this.handleAddSavedPost().then(() => {
        if (this.props.handleActions) {
          this.props.handleActions(event, {
            value: 'remove-saved-post-done'
          }, post, this);
        }
      });

    case ContextOptions.iWillDoThis:
      if (UserService.isLoggedIn) {
        return MessageDialogService.showUpComingFeature(option.value);
      }
      return LoginDialogService.open();

    case ContextOptions.delete:
      if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
        return null;
      }
      return superrequest.agentDelete(`/api/v1/blog/posts/${post._id}`)
        .then(() => {
          this.props.handleActions(event, { value: 'delete-done' }, post, this);
        });
    default:
      break;
    }

    if (this.props.handleActions) {
      return this.props.handleActions(event, option, post, this);
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

  handleRating(rating) {
    const { post } = this.props;
    if (!UserService.isLoggedIn) {
      LoginDialogService.open();
      return;
    }

    const savedState = {
      postRating: post.rating,
      postTotalRating: post.totalRating,
      postTotalVotes: post.totalVotes,
      userSocialPoint: UserService.user.socialPoint
    };

    if (post.rating) {
      post.totalRating = post.totalRating - post.rating + rating;
    } else {
      post.totalRating += rating;
      post.totalVotes += 1;
      UserService.user.socialPoint = (UserService.user.socialPoint || 0) + 1;
      UserService.setUser(UserService.user);
    }
    post.rating = rating;
    this.forceUpdate();

    superrequest.agentPost(`/api/v1/blog/rating/${post._id}`, {
      rating
    }).then((res) => {
      if (!res || !res.ok) {
        post.rating = savedState.postRating;
        post.totalRating = savedState.postTotalRating;
        post.totalVotes = savedState.postTotalVotes;
        UserService.user.socialPoint = savedState.userSocialPoint;
        UserService.setUser(UserService.user);
        this.forceUpdate();
      } else {
        Object.assign(UserService.user, res.data.user);
        UserService.setUser(UserService.user);
      }
    });
  }

  handleAddSavedPost() {
    const { post } = this.props;
    if (!UserService.isLoggedIn) {
      return LoginDialogService.open();
    }

    const savedState = {
      postIsSaved: post.isSaved
    };

    post.isSaved = !post.isSaved;
    this.forceUpdate();

    if (post.isSaved) {
      return superrequest.agentPost(`/api/v1/blog/saved-posts/${post._id}`).then((res) => {
        if (!res || !res.ok) {
          post.isSaved = savedState.postIsSaved;
          this.forceUpdate();
        } else {
          // MessageDialogService.showSuccessMessage(ContextOptions.save.value, true);
        }
      });
    }

    return superrequest.agentDelete(`/api/v1/blog/saved-posts/${post._id}`).then((res) => {
      if (!res || !res.ok) {
        post.isSaved = savedState.postIsSaved;
        this.forceUpdate();
      } else {
        // MessageDialogService.showSuccessMessage(ContextOptions.save.value, false);
      }
    });
  }

  render() {
    const { allSmall } = this.props;
    let { post = {} } = this.props;
    const {
      _id = post._id,
      preview = post.preview,
      title = post.title,
      summary = post.summary,
      content = post.content,
      categories = post.categories,
      category = post.categories[0].type,
      createdAt = post.createdAt,
      authors = post.authors,
      totalRating = post.totalRating,
      totalVotes = post.totalVotes,
      rating = post.rating,
      isSaved = post.isSaved,
      totalSaved = post.totalSaved
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
      categories,
      category,
      createdAt,
      authors,
      totalRating,
      totalVotes,
      rating,
      isSaved,
      totalSaved
    };
    const postContextOptions = getContextOptions(post);
    const ratingInfo = {
      totalRating,
      totalVotes,
      rating
    };
    const addSavedPostOption = postContextOptions.find(
      option => option.value === ContextOptions.save.value
    );
    const isReallySaved = UserService.isLoggedIn && isSaved;
    if (addSavedPostOption) {
      addSavedPostOption.label = !isReallySaved ? 'lưu bài viết' : 'bỏ lưu bài viết';
    }

    return (
      <Card className="post">
        <div className="post__rating">
          <Rating {...ratingInfo} onRating={this.handleRating} id={_id} />
        </div>
        <MDBPopover
          placement="top"
          clickable={clickable}
          isVisible={isVisible}
          domElement
          popover
          onChange={this.handlePopupChange}
          id={_id}
        >
          <span className={`post__preview ${isReallySaved ? 'saved' : ''} ${preview ? category : ''}`}>
            {preview
              ? this.renderPreviewAsImage()
              : this.renderPreviewAsTitle()}
            {postContextOptions && (
              <div className="post__context-btn">
                <ContextButton options={postContextOptions} handler={this.handleContextActions} />
              </div>
            )}
            {isReallySaved && <IconBookmark className="post__bookmark" totalSaved={totalSaved} />}
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
          {(!preview || !allSmall) && summary && <div className="post__summary mt-2">{summary}</div>}
        </CardBody>
        <CardFooter className="d-flex align-items-center justify-content-stretch flex-wrap">
          <div className="flex-fill post__socials">
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
