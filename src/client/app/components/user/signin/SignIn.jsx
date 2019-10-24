import React, { Component } from 'react';
import {
  MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
  MDBTooltip
} from 'mdbreact';
import './SignIn.scss';

import UserService from '../../../services/UserService';
import AuthService from '../../../services/Auth';
import t from '../../../languages';
import LoginDialogService from '../../../services/LoginDialogService';
import ProgressWithIcon from '../../utils/progres-with-icon/ProgressWithIcon';
import { IconRankLeader } from '../../../../assets/icons';
import MessageDialogService from '../../../services/MessageDialogService';


export default class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.rankRef = React.createRef();
    this.dropdownRef = null;
    this.handleOnDropdownRef = this.handleOnDropdownRef.bind(this);
    this.state = {
      isShowLoginModal: false,
      disabled: false
    };
    UserService.useFbUserState(this);
    UserService.useFbProfileState(this);
    UserService.useUserState(this);
  }

  handleOnDropdownRef(ref) {
    this.dropdownRef = ref;
    if (!ref || (ref && ref._toggle)) {
      return;
    }
    ref._toggle = ref.toggle;
    ref.toggle = (...args) => {
      ref._toggle(...args);
      if (!ref.state.isOpen) {
        this.handleOpenMenuContext();
      } else {
        this.handleCloseMenuContext();
      }
    };
  }

  handleOpenMenuContext() {
    this.rankRef.current.setOpen(true);
  }

  handleCloseMenuContext() {
    this.rankRef.current.setOpen(false);
  }

  static handleSignOut() {
    AuthService.logout();
  }

  static open() {
    LoginDialogService.open();
  }

  static handleContextAction(event) {
    const option = event.target.name;
    switch (option) {
    case 'save-post':
      return MessageDialogService.showUpComingFeature(option);
    case 'i-will-do-this':
      return MessageDialogService.showUpComingFeature(option);
    default:
      return null;
    }
  }

  renderAvatar() {
    const { disabled } = this.state;
    const { fbProfile, user } = UserService;
    const nextLevel = 10;
    const socialPoint = user
      ? user.socialPoint || 0
      : 0;

    return (
      <MDBDropdown
        dropleft
        ref={this.handleOnDropdownRef}
      >
        <MDBDropdownToggle
          floating
          color="link"
          className="p-0 btn-paper rounded-circle shadow-style highlight-style"
          style={{ width: '35px', height: '35px' }}
        >
          <img
            alt="(^_^)!"
            src={UserService.fbAvatarSrc}
            title={fbProfile ? `Hi ${fbProfile.short_name}!` : ''}
            width="100%"
            height="100%"
            className="img-fluid z-depth-1 rounded-circle"
          />
        </MDBDropdownToggle>
        <MDBDropdownMenu basic flip>
          {user && (
            <React.Fragment>
              <MDBDropdownItem className="text-center" header>
                <ProgressWithIcon
                  ref={this.rankRef}
                  percent={user.socialPoint / nextLevel * 100}
                  icon={<IconRankLeader />}
                />
                <MDBTooltip>
                  <MDBBtn
                    className="py-0 pl-1 pr-1 m-0 text-center mt-2 text-bold"
                    size="lg"
                    color="link"
                  >{socialPoint} / {nextLevel}
                  </MDBBtn>
                  <div>
                    {!socialPoint ? (
                      <div>Bạn vẫn chưa có hoạt động nào</div>
                    ) : (
                      <div>Đây là điểm hoạt động của bạn.
                        <br />Cảm ơn bạn vì đã nỗ lực cùng thế giới chống biến đổi khí hậu!
                        <br />...những việc bạn làm sẽ giúp cứu hàng triệu sinh mạng.
                      </div>
                    )}
                  </div>
                </MDBTooltip>
                <div className="text-center text-light" />
              </MDBDropdownItem>
              <MDBDropdownItem divider />
            </React.Fragment>
          )}
          <MDBDropdownItem
            disabled={disabled}
            className="text-gray"
            name="save-post"
            onClick={SignIn.handleContextAction}
          >Bài viết đã lưu
          </MDBDropdownItem>
          <MDBDropdownItem
            disabled={disabled}
            className="text-gray"
            name="i-will-do-this"
            onClick={SignIn.handleContextAction}
          >Điều tôi sẽ làm
          </MDBDropdownItem>
          <MDBDropdownItem
            disabled={disabled}
            onClick={SignIn.handleSignOut}
            className="text-gray"
          >{t('components.user.logout')}
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }

  render() {
    console.log('render "Comps/signin/SignIn.jsx"');
    const {
      disabled
    } = this.state;
    const { fbUser } = UserService;

    return (
      <React.Fragment>
        {fbUser
          ? this.renderAvatar()
          : (
            <MDBBtn
              onClick={SignIn.open}
              size="sm"
              className="px-2 py-1 my-2 shadow-none"
              disabled={disabled}
            >
              {t('components.user.login')}
            </MDBBtn>
          )}
      </React.Fragment>
    );
  }
}
