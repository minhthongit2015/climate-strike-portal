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
import DummyTheRealWorldPage from './pages/the-real-world/DummyTheRealWorld';

import superws from './utils/superws';

import RouteConstants from './utils/RouteConstants';

import KeyTracker from './utils/KeyTracker';
import AuthService from './services/Auth';
import PostService from './services/PostService';
import PageDialogService from './services/PageDialogService';
import LoginDialogService from './services/LoginDialogService';
import MessageDialogService from './services/MessageDialogService';
import PageDialog from './components/dialog/PageDialog';
import LoginDialog from './components/dialog/LoginDialog';
import MessageDialog from './components/dialog/MessageDialog';

const HomePage = React.lazy(() => import('./pages/home/Home'));
const EarthPicturePage = React.lazy(() => import('./pages/earth-picture/EarthPicture'));
const WhatYouCanDoPage = React.lazy(() => import('./pages/what-you-can-do/WhatYouCanDo'));
const YourQuestionPage = React.lazy(() => import('./pages/your-question/YourQuestion'));
const TheRealWorldPage = React.lazy(() => import('./pages/the-real-world/TheRealWorld'));

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  get isTheRealWorldPage() {
    return window.location.pathname === RouteConstants.theRealWorldPath;
  }

  constructor(props) {
    super(props);
    this.pageDialogRef = React.createRef();
    this.loginDialogRef = React.createRef();
    this.messageDialogRef = React.createRef();
    GlobalState.init();
    GlobalState.loadState();
    superws.init();
    AuthService.init();
    PageDialogService.init(this.pageDialogRef);
    LoginDialogService.init(this.loginDialogRef);
    MessageDialogService.init(this.messageDialogRef);
    PostService.init();
    KeyTracker();
  }

  render() {
    const routes = (
      <React.Suspense fallback={<LeafLoading overlaping text="Climate Strike Vietnam" />}>
        <Switch>
          <Route exact path={RouteConstants.homePath}><HomePage /></Route>
          <Route path={RouteConstants.earthPicturePath}><EarthPicturePage /></Route>
          <Route exact path={RouteConstants.theRealWorldPath}><DummyTheRealWorldPage /></Route>
          <Route path={RouteConstants.whatYouCanDoPath}><WhatYouCanDoPage /></Route>
          <Route path={RouteConstants.yourQuestionPath}><YourQuestionPage /></Route>
          <Redirect to={RouteConstants.homeLink} />
        </Switch>
        {(this.isTheRealWorldPage || window.myGoogleMap) && <TheRealWorldPage />}
        <PageDialog ref={this.pageDialogRef} />
        <LoginDialog ref={this.loginDialogRef} />
        <MessageDialog ref={this.messageDialogRef} />
      </React.Suspense>
    );
    return (
      <SimplestLayout routes={routes} />
    );
  }
}

export default hot(App);
