import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './ui/Home';

class Routes extends Component {
  public render() {
    return (
      <Router>
        <main>
          <Route exact path="/" component={Home} />
        </main>
      </Router>
    );
  }
}

export default Routes;
