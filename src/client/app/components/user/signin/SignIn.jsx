import React, { Component } from 'react';
import {
  MDBModal, MDBModalBody,
  MDBBtn, MDBInput,
  MDBWaves,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import './SignIn.scss';

import UserService from '../../../services/UserService';
import AuthService from '../../../services/Auth';
import t from '../../../languages';


class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSigninWithFacebook = this.handleSigninWithFacebook.bind(this);
    this.state = {
      isShowLoginModal: false,
      email: '',
      password: '',
      cursorPos: {},
      disabled: false
    };
    UserService.useFbUserState(this);
    UserService.useFbProfileState(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const res = await UserService.signIn(this.state.email, this.state.password);
    if (!res.ok) {
      return alert('Invalid email or password');
    }
    if (res.data.user) {
      this.props.actions.saveUser(res.data.user);
      return this.close();
    }
    return alert('Invalid email or password');
  }

  handleSigninWithFacebook() {
    this.setState({
      disabled: true
    }, () => {
      AuthService.fbLogin()
        .then((ok) => {
          this.setState({
            disabled: false
          });
          if (ok) {
            this.close();
          }
        });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSignOut() {
    AuthService.logout();
  }

  handleClick = (e) => {
    e.stopPropagation();
    console.log(e);
    const cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now()
    };
    this.setState({ cursorPos });
  };

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close() {
    if (!this.isOpen) return;
    this.toggle();
  }

  toggle = () => {
    if (this.state.disabled) {
      return;
    }
    this.setState({
      isShowLoginModal: !this.isOpen
    });
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
            title={fbProfile ? `Hi, ${fbProfile.name}!` : ''}
            width="100%"
            height="100%"
            className="img-fluid z-depth-1 rounded-circle"
          />
        </MDBDropdownToggle>
        <MDBDropdownMenu basic>
          <MDBDropdownItem
            disabled={disabled}
            onClick={this.handleSignOut}
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
      isShowLoginModal, email, password, disabled
    } = this.state;
    const { fbUser } = UserService;

    return (
      <React.Fragment>
        {fbUser
          ? this.renderAvatar()
          : (
            <MDBBtn
              onClick={this.open}
              size="sm"
              className="px-2 py-1 my-2 shadow-none"
              disabled={disabled}
            >
              {t('components.user.login')}
            </MDBBtn>
          )}
        <MDBModal
          isOpen={isShowLoginModal}
          toggle={this.toggle}
          className="login-modal"
          style={{ position: 'relative' }}
          disabled={disabled}
        >
          <div
            className="modal-header peach-gradient justify-content-center mb-3 p-4 waves-effect"
            onMouseDown={this.handleClick}
            onTouchStart={this.handleClick}
          >
            <h5 className="white-text font-weight-bolder m-0">❝Climate Strike Vietnam❞</h5>
            <MDBWaves
              cursorPos={this.state.cursorPos}
            />
          </div>
          <MDBModalBody>
            <form onSubmit={this.handleSubmit} id="signin-form">
              <MDBInput
                style={{ boxSizing: 'border-box' }}
                className="px-3"
                label="Email"
                name="email"
                value={email}
                required
                onChange={this.handleInputChange}
                type="email"
                error="wrong"
                success="right"
                autoComplete="email"
                // validate
              />
              <MDBInput
                style={{ boxSizing: 'border-box' }}
                className="px-3"
                label="Password"
                name="password"
                value={password}
                required
                onChange={this.handleInputChange}
                type="password"
                autoComplete="current-password"
                // validate
              />
              <div className="text-center">
                <MDBBtn
                  color="none"
                  className="btn-paper shadow-style mb-3 px-4 py-2"
                  onClick={this.handleSigninWithFacebook}
                >
                  đăng nhập với Facebook
                </MDBBtn>
              </div>
              <div className="text-center mb-3">
                <MDBBtn
                  gradient="peach"
                  type="submit"
                  form="signin-form"
                  className="shadow-sm px-5 py-3"
                >Đăng Nhập
                </MDBBtn>
              </div>
            </form>
          </MDBModalBody>
        </MDBModal>
      </React.Fragment>
    );
  }
}

export default SignIn;
