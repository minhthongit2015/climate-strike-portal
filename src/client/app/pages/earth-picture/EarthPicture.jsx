import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './EarthPicture.scss';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabEarthPicture from './tab-earth-picture/TabEarthPicture';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';
import t from '../../languages';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.earthPicture.nav.main'),
      link: RouteConstants.earthPictureLink
    };
    this.tabs = [
      {
        name: t('pages.earthPicture.nav.climate'),
        path: RouteConstants.epClimatePath,
        link: RouteConstants.epClimateLink,
        component: TabClimate
      },
      {
        name: t('pages.earthPicture.nav.organisms'),
        path: RouteConstants.epOrganismsPath,
        link: RouteConstants.epOrganismsLink,
        component: TabOrganisms
      },
      {
        name: t('pages.earthPicture.nav.pollution'),
        path: RouteConstants.epPollutionPath,
        link: RouteConstants.epPollutionLink,
        component: TabPollution
      }
    ];
  }

  render() {
    return (
      <SidebarLayout navItems={this.tabs} brand={this.brand}>
        <Switch>
          {this.tabs.map(tab => (
            <Route key={tab.name} exact path={tab.path} component={tab.component} />
          ))}
          <Route exact path={RouteConstants.earthPicturePath} component={TabEarthPicture} />
          <Redirect to={RouteConstants.earthPictureLink} />
        </Switch>
      </SidebarLayout>
    );
  }
}
