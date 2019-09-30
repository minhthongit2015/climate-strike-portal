import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabYourQuestion from './tab-your-question/TabYourQuestion';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';
import TabOthers from './tab-others/TabOthers';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: 'Điều Bạn Muốn Biết?',
      link: RouteConstants.yourQuestionLink
    };
    this.tabs = [
      {
        name: 'Về khí hậu',
        path: RouteConstants.askForClimatePath,
        link: RouteConstants.askForClimateLink,
        component: TabClimate
      },
      {
        name: 'Về sinh vật',
        path: RouteConstants.askForOrganismsPath,
        link: RouteConstants.askForOrganismsLink,
        component: TabOrganisms
      },
      {
        name: 'Về ô nhiễm',
        path: RouteConstants.askForPollutionPath,
        link: RouteConstants.askForPollutionLink,
        component: TabPollution
      },
      {
        name: 'Chủ đề khác',
        path: RouteConstants.askForOthersPath,
        link: RouteConstants.askForOthersPath,
        component: TabOthers
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
