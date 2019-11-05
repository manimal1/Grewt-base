import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Landing } from './ui/landing';
import { Signin, Signup } from './ui/auth';
// import { ProtectedRoute } from 'components';

class Routes extends Component {
  public render() {
    return (
      <Router>
        <main>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          {/* place Protected Routes here
          <Switch>
            <ProtectedRoute exact path="/somePath" component={SomeComponent} />
          </Switch>
           */}
        </main>
      </Router>
    );
  }
}

export default Routes;
