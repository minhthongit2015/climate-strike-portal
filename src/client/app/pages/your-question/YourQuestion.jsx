import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabYourQuestion from './tab-your-question/TabYourQuestion';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: 'Điều Bạn Muốn Biết?',
      link: RouteConstants.yourQuestionLink
    };
    this.tabs = [
      {
        name: 'Khí hậu',
        path: RouteConstants.epClimatePath,
        link: RouteConstants.epClimateLink,
        component: TabClimate
      },
      {
        name: 'Sinh vật',
        path: RouteConstants.epOrganismsPath,
        link: RouteConstants.epOrganismsLink,
        component: TabOrganisms
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
          <Route path="/" component={TabYourQuestion} />
        </Switch>
      </SidebarLayout>
    );
  }
}
