import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabWhatYouCanDo from './tab-what-you-can-do/TabWhatYouCanDo';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';
import TabSupporting from './tab-supporting/TabSupporting';
import TabWorldActions from './tab-world-actions/TabWorldActions';
import TabCommunityRecommend from './tab-community-recommend/TabCommunityRecommend';
import t from '../../languages';
import { IconCommunity } from '../../../assets/icons';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.whatYouCanDo.nav.main'),
      link: RouteConstants.whatYouCanDoLink
    };
    this.tabs = [
      {
        name: t('pages.whatYouCanDo.nav.climate'),
        path: RouteConstants.doForClimatePath,
        link: RouteConstants.doForClimateLink,
        component: TabClimate
      },
      {
        name: t('pages.whatYouCanDo.nav.organisms'),
        path: RouteConstants.doForOrganismsPath,
        link: RouteConstants.doForOrganismsLink,
        component: TabOrganisms
      },
      {
        name: t('pages.whatYouCanDo.nav.pollution'),
        path: RouteConstants.doForPollutionPath,
        link: RouteConstants.doForPollutionLink,
        component: TabPollution
      },
      {
        name: t('pages.whatYouCanDo.nav.supporting'),
        path: RouteConstants.doSupportingPath,
        link: RouteConstants.doSupportingLink,
        component: TabSupporting
      },
      {
        name: t('pages.whatYouCanDo.nav.worldActions'),
        path: RouteConstants.worldActionsPath,
        link: RouteConstants.worldActionsLink,
        component: TabWorldActions
      },
      {
        name: <IconCommunity text={t('pages.whatYouCanDo.nav.communityRecommend')} />,
        path: RouteConstants.communityRecommendPath,
        link: RouteConstants.communityRecommendLink,
        component: TabCommunityRecommend
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
          <Route exact path={RouteConstants.whatYouCanDoPath} component={TabWhatYouCanDo} />
          <Redirect to={RouteConstants.whatYouCanDoLink} />
        </Switch>
      </SidebarLayout>
    );
  }
}
