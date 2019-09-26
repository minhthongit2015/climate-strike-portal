/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BasePage from '../_base/BasePage';
import './EarthPicture.scss';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabEarthPicture from './tab-earth-picture/TabEarthPicture';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';
import Test from '../../components/test';

export default class extends BasePage {
  constructor(props) {
    super(props, 'Bức Tranh Trái Đất');
    this.brand = {
      name: 'Bức Tranh Trái Đất',
      link: RouteConstants.earthPictureLink
    };
    this.tabs = [
      {
        name: 'Sinh vật',
        path: RouteConstants.epOrganismsPath,
        link: RouteConstants.epOrganismsLink,
        component: TabOrganisms
      },
      {
        name: 'Khí hậu',
        path: RouteConstants.epClimatePath,
        link: RouteConstants.epClimateLink,
        component: TabClimate
      },
      {
        name: 'Ô nhiễm',
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
          <Route path="/" component={TabEarthPicture} />
        </Switch>
        <Test>hello</Test>
      </SidebarLayout>
    );
  }
}
