import React from 'react';
import {
  MDBModal, MDBModalBody,
  MDBWaves,
  MDBBtn
} from 'mdbreact';
import LeafLoading from '../../utils/loadings/LeafLoading';
import MapService from '../../../services/MapService';
import PostService from '../../../services/PostService';


export default class extends React.Component {
  get isOpen() { return this.state.isShowModal; }

  static get type() { return 'EditingDialog'; }

  get place() {
    const { place } = this.state;
    return {
      _id: place._id,
      __t: place.__t,
      events: place.events,
      position: place.position,
      description: place.description,
      name: place.name,
      cover: place.cover,
      path: place.path,
      radius: place.radius
    };
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDiscard = this.handleDiscard.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      link: '',
      place: {},
      marker: null,
      cursorPos: {},
      isShowModal: false,
      disabled: false,
      title: '❝Climate Strike Vietnam❞'
    };
  }

  handleClick = (e) => {
    e.stopPropagation();
    const cursorPos = { top: e.clientY, left: e.clientX, time: Date.now() };
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

  toggle() {
    if (this.state.disabled) {
      return;
    }
    this.setState({
      isShowModal: !this.isOpen
    });
  }

  show(title) {
    this.setState({
      title
    }, () => this.open());
  }

  edit(place, marker) {
    this.setState({
      place,
      marker,
      isShowModal: true
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setPlaceState(name, value);
  }

  handleLinkChange(event) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      link: event.target.value
    });
    PostService.fetchPost(PostService.extractPostOrder(event.target.value))
      .then((res) => {
        if (!res || !res.data) {
          return;
        }
        this.setPlaceState('post', res.data[0]);
      });
  }

  setPlaceState(name, value) {
    this.setState((prevState) => {
      prevState.place[name] = value;
      return {
        place: prevState.place
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      disabled: true
    });
    this.state.marker.refresh();
    MapService.updatePlace(this.place)
      .then(() => {
        this.setState({
          disabled: false
        });
        this.close();
      })
      .catch(() => {
        this.setState({
          disabled: false
        });
        this.close();
      });
  }

  handleDiscard() {
    this.close();
  }

  // eslint-disable-next-line class-methods-use-this
  renderContent() {
    return null;
  }

  renderActions() {
    return (
      <div className="text-right">
        <MDBBtn onClick={this.handleDiscard} color="light" size="sm">Bỏ</MDBBtn>
        <MDBBtn type="submit" size="sm">Lưu</MDBBtn>
      </div>
    );
  }

  render() {
    const {
      title, cursorPos,
      isShowModal, disabled,
      color = 'deep-blue-gradient',
      place
    } = this.state;
    const { noHeader } = this.props;

    return (
      <MDBModal
        isOpen={isShowModal}
        toggle={this.toggle}
        className=""
        style={{ position: 'relative' }}
        disabled={disabled}
      >
        {!noHeader && (
          <div
            className={`modal-header justify-content-center mb-3 p-4 waves-effect ${color}`}
            onMouseDown={this.handleClick}
            onTouchStart={this.handleClick}
          >
            <h5 className="white-text font-weight-bolder m-0">{title}</h5>
            <MDBWaves
              cursorPos={cursorPos}
            />
          </div>
        )}
        <MDBModalBody>
          <form onSubmit={this.handleSubmit}>
            {this.renderContent(place)}
            {this.renderActions()}
          </form>
        </MDBModalBody>
        <LeafLoading overlaping={disabled} text="đang lưu thông tin..." />
      </MDBModal>
    );
  }
}
