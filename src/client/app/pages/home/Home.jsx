import React from 'react';
import BasePage from '../_base/BasePage';
import './Home.scss';

import RouteConstants from '../../utils/RouteConstants';
import {
  MyGardenSrc,
  AICloudSrc,
  SmileCitySrc
} from '../../../assets/icons';

import NavIconLink from '../../components/utils/nav-icon-link/NavIconLink';

export default class HomePage extends BasePage {
  constructor(props) {
    super(props, 'Climate Strike Viet Nam', true);
    this.links = [
      {
        type: 'nav', link: RouteConstants.earthPictureLink, text: 'Bức Tranh\r\nTrái Đất', iconSrc: AICloudSrc
      },
      {
        type: 'nav', link: RouteConstants.theRealWorldLink, text: 'Thế Giới Thực', iconSrc: MyGardenSrc
      },
      {
        type: 'nav', link: RouteConstants.whatYouCanDoLink, text: 'Điều Bạn\r\nCó Thể Làm', iconSrc: SmileCitySrc
      },
      {
        type: 'nav', link: RouteConstants.yourQuestionLink, text: 'Điều Bạn\r\nMuốn Biết?', iconSrc: AICloudSrc
      }
    ];
  }

  static renderNav(nav) {
    return (
      <div className="col-3" key={nav.link}>
        <NavIconLink nav={nav} ratio={1} />
      </div>
    );
  }

  render() {
    console.log('render "Pages/home/Home.jsx"');
    return (
      <React.Fragment>
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column col-lg-8 col-md-10 col-sm-12 col-xs-12 col-12">
            <div className="text-center text-light">
              hãy thử xem nếu mình có thể thuyết phục bạn tin vào điều này
            </div>
            <div className="d-flex">
              {
                this.links.map((link) => {
                  if (link.type === 'nav') {
                    return HomePage.renderNav(link);
                  }
                  return null;
                })
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
