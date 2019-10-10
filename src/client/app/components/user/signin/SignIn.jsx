import React, { Component } from 'react';
import {
  MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import './SignIn.scss';

import UserService from '../../../services/UserService';
import AuthService from '../../../services/Auth';
import t from '../../../languages';
import LoginDialogService from '../../../services/LoginDialogService';


export default class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal: false,
      disabled: false
    };
    UserService.useFbUserState(this);
    UserService.useFbProfileState(this);
  }

  static handleSignOut() {
    AuthService.logout();
  }

  static open() {
    LoginDialogService.open();
  }

  renderAvatar() {
    const { disabled } = this.state;
    const { fbProfile } = UserService;
    return (
      <MDBDropdown dropleft>
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
        <MDBDropdownMenu basic>
          <MDBDropdownItem
            disabled={disabled}
            onClick={SignIn.handleSignOut}
          >{t('components.user.logout')}
          </MDBDropdownItem>
          {/* <MDBDropdownItem divider />
          <MDBDropdownItem>Separated link</MDBDropdownItem> */}
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
