import React from 'react';
import BasePage from '../_base/BasePage';
import './Home.scss';

import GlobalState from '../../utils/GlobalState';
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

    GlobalState.useState('profile', null, this);
  }

  static renderNav(nav) {
    return (
      <div className="col-3" key={nav.link}>
        <NavIconLink nav={nav} ratio={1} />
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomQuote(name) {
    const now = new Date();
    if (now.getHours() >= 1 && now.getHours() <= 9) {
      return `Chào buổi sáng ${name}! Chúc một ngày vui vẻ!`;
    } if (now.getHours() >= 15 && now.getHours() <= 17) {
      return `Chào buổi chiều ${name}`;
    } if (now.getHours() >= 18 && now.getHours() <= 20) {
      return `Chào buổi tối ${name}`;
    }
    return '';
  }

  render() {
    console.log('render "Pages/home/Home.jsx"');
    return (
      <React.Fragment>
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column col-lg-8 col-md-10 col-sm-12 col-xs-12 col-12">
            <div className="text-center text-light">
              đây là những gì đang diễn ra, và bạn có thể chọn tin vào điều đó hay không
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
            {GlobalState.profile && (
              <div className="text-center text-light mt-5">
                {this.getRandomQuote(GlobalState.profile.name)}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
