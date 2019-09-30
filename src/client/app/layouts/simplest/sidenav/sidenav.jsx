import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './sidenav.scss';
// import SignIn from '../../../components/signin/SignIn';

import RouteConstants from '../../../utils/RouteConstants';
import {
  AICloudSrc,
  MyGardenSrc,
  SmileCitySrc
} from '../../../../assets/icons';

import NavIconLink from '../../../components/utils/nav-icon-link/NavIconLink';
import FixedRatioImage from '../../../components/utils/fixed-ratio-image/FixedRatioImage';

export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.links = [
      {
        type: 'nav', link: RouteConstants.earthPictureLink, text: 'Bức Tranh\r\nTrái Đất', iconSrc: AICloudSrc
      },
      {
        type: 'nav', link: RouteConstants.theRealWorldLink, text: 'Thế Giới\r\nThực', iconSrc: MyGardenSrc
      },
      {
        type: 'nav', link: RouteConstants.whatYouCanDoLink, text: 'Điều Bạn\r\nCó Thể Làm', iconSrc: SmileCitySrc
      },
      {
        type: 'nav', link: RouteConstants.yourQuestionLink, text: 'Điều Bạn\r\nMuốn Biết?', iconSrc: AICloudSrc
      }
    ];
  }

  static renderHomeNav() {
    return (
      <div className="w-100">
        <NavLink
          key="home"
          to={RouteConstants.homeLink}
          title="Điểm khởi đầu"
          className="border-bottom border-light pb-2 w-100"
          draggable={false}
        >
          <div className="d-flex waves-effect waves-light border border-info rounded m-2">
            <div key="ai" className="col-4 px-0"><FixedRatioImage src={AICloudSrc} /></div>
            <div key="garden" className="col-4 px-0"><FixedRatioImage src={MyGardenSrc} /></div>
            <div key="city" className="col-4 px-0"><FixedRatioImage src={SmileCitySrc} /></div>
          </div>
        </NavLink>
      </div>
    );
  }

  static renderNav(nav) {
    return <NavIconLink nav={nav} key={nav.link} />;
  }

  render() {
    console.log('render "Layouts/simplest/sidenav/SideNav.jsx"');
    return (
      <aside
        className={
          classNames(
            'sidenav',
            'd-flex flex-column justify-content-center align-items-center modern-scrollbar',
            { hide: this.props.hide }
          )
        }
      >
        {/* <div className="signin-button text-center">
          <SignIn />
        </div> */}
        {SideNav.renderHomeNav()}
        {
          this.links.map((link) => {
            if (link.type === 'nav') {
              return SideNav.renderNav(link);
            }
            return null;
          })
        }
      </aside>
    );
  }
}
