import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabWhatYouCanDo from './tab-what-you-can-do/TabWhatYouCanDo';
import TabForEverything from './tab-everything/TabForEverything';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: 'Điều Bạn Có Thể Làm',
      link: RouteConstants.whatYouCanDoLink
    };
    this.tabs = [
      {
        name: 'Cho tất cả',
        path: RouteConstants.doForEverythingPath,
        link: RouteConstants.doForEverythingLink,
        component: TabForEverything
      },
      {
        name: 'Cho khí hậu',
        path: RouteConstants.doForClimatePath,
        link: RouteConstants.doForClimateLink,
        component: TabClimate
      },
      {
        name: 'Cho sinh vật',
        path: RouteConstants.doForOrganismsPath,
        link: RouteConstants.doForOrganismsLink,
        component: TabOrganisms
      },
      {
        name: 'Cho ô nhiễm',
        path: RouteConstants.doForPollutionPath,
        link: RouteConstants.doForPollutionLink,
        component: TabPollution
      },
      {
        name: 'Tin tức Thế Giới',
        path: RouteConstants.worldActionsPath,
        link: RouteConstants.worldActionsLink,
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
          <Route path="/" component={TabWhatYouCanDo} />
        </Switch>
      </SidebarLayout>
    );
  }
}
