import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalState from './utils/GlobalState';
import LeafLoading from './components/utils/loadings/LeafLoading';

import '../styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';

import SimplestLayout from './layouts/simplest/simplest';
import DummyTheRealWorldPage from './pages/smile-city/DummySmileCity';

import superws from './utils/superws';

import RouteConstants from './utils/RouteConstants';

import KeyTracker from './utils/KeyTracker';


const HomePage = React.lazy(() => import('./pages/home/Home'));
const EarthPicturePage = React.lazy(() => import('./pages/earth-picture/EarthPicture'));
const UserGardenPage = React.lazy(() => import('./pages/my-garden/MyGarden'));
const TheRealWorldPage = React.lazy(() => import('./pages/smile-city/SmileCity'));

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  get isTheRealWorldPage() {
    return window.location.pathname === RouteConstants.theRealWorldPath;
  }

  constructor(props) {
    super(props);
    GlobalState.init();
    GlobalState.loadState();
    superws.setup();
    KeyTracker();
  }

  render() {
    const routes = (
      <React.Suspense fallback={<LeafLoading overlaping text="Climate Strike Viet Nam" />}>
        <Switch>
          <Route exact path={RouteConstants.homePath}><HomePage /></Route>
          <Route path={RouteConstants.earthPicturePath}><EarthPicturePage /></Route>
          <Route exact path={RouteConstants.theRealWorldPath}><DummyTheRealWorldPage /></Route>
          <Route exact path={RouteConstants.whatYouCanDoPath}><UserGardenPage /></Route>
          <Route exact path={RouteConstants.yourQuestionPath}><UserGardenPage /></Route>
          <Redirect to={RouteConstants.homeLink} />
        </Switch>
        {(this.isTheRealWorldPage || window.myGoogleMap) && <TheRealWorldPage />}
      </React.Suspense>
    );
    return (
      <SimplestLayout routes={routes} />
    );
  }
}

export default hot(App);
