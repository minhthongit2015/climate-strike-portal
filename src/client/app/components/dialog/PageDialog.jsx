import React from 'react';
import {
  MDBModal, MDBModalBody
} from 'mdbreact';
import BasePage from '../../pages/_base/BasePage';


export default class extends BasePage {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isShowLoginModal: false
    };
  }

  // eslint-disable-next-line class-methods-use-this
  setHistory({ url, title, state }) {
    window.history.pushState(state, title, url);
    this.historyBack = true;
  }

  setContent(content) {
    this.setState({
      content
    });
  }

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close() {
    if (!this.isOpen) return;
    this.toggle();
  }

  toggle = () => {
    if (this.state.disabled) return;
    if (this.isOpen) {
      if (this.historyBack) {
        this.historyBack = false;
        window.history.back();
      } else {
        const { location } = window;
        const parentUrl = `${location.origin}${location.pathname}`;
        window.history.pushState(undefined, '', parentUrl);
      }
    }
    this.setState({
      isShowLoginModal: !this.isOpen
    });
  }

  render() {
    const { isShowLoginModal, content } = this.state;
    return (
      <MDBModal
        isOpen={isShowLoginModal}
        toggle={this.toggle}
        style={{ position: 'relative' }}
        size="lg"
      >
        <MDBModalBody>
          {content}
        </MDBModalBody>
      </MDBModal>
    );
  }
}
