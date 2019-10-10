import React from 'react';
import BasePage from '../_base/BasePage';
import './Home.scss';

import UserService from '../../services/UserService';
import RouteConstants from '../../utils/RouteConstants';
import {
  IconEarthPicture,
  IconWhatYouCanDo,
  IconYourQuestion
} from '../../../assets/icons';

import NavIconLink from '../../components/utils/nav-icon-link/NavIconLink';
import t from '../../languages';

export default class HomePage extends BasePage {
  constructor(props) {
    super(props, 'Climate Strike Vietnam', true);
    this.links = [
      {
        type: 'nav',
        link: RouteConstants.earthPictureLink,
        text: t('pages.home.nav.earthPicture'),
        icon: IconEarthPicture
      },
      // {
      //   type: 'nav',
      //   link: RouteConstants.theRealWorldLink,
      //   text: t('pages.home.nav.theRealWorld'),
      //   iconSrc: MyGardenSrc
      // },
      {
        type: 'nav',
        link: RouteConstants.whatYouCanDoLink,
        text: t('pages.home.nav.whatYouCanDo'),
        icon: IconWhatYouCanDo
      },
      {
        type: 'nav',
        link: RouteConstants.yourQuestionLink,
        text: t('pages.home.nav.yourQuestion'),
        icon: IconYourQuestion
      }
    ];

    UserService.useFbProfileState(this);
  }

  componentDidMount() {
    super.componentDidMount();
    console.log('Home mounted');
  }

  static renderNav(nav) {
    return (
      <div className="col-4" key={nav.link}>
        <NavIconLink nav={nav} ratio={1} />
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomQuote(name) {
    const now = new Date();
    if (now.getHours() >= 1 && now.getHours() <= 11) {
      return `Chào buổi sáng... ${name}! Chúc một ngày mới vui vẻ!`;
    } if (now.getHours() >= 13 && now.getHours() <= 17) {
      return `Chào buổi chiều... ${name}`;
    } if (now.getHours() >= 18 && now.getHours() <= 23) {
      return `Chào buổi tối... ${name}`;
    }
    return '';
  }

  render() {
    const { fbProfile } = UserService;
    console.log('render "Pages/home/Home.jsx"');
    return (
      <React.Fragment>
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column col-lg-8 col-md-10 col-sm-12 col-xs-12 col-12">
            <div className="text-center text-light">
              {t('pages.home.mainMessage')}
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
            {fbProfile && (
              <div className="text-center text-light mt-5">
                {this.getRandomQuote(fbProfile.short_name)}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
