import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './Routes';

class App extends Component {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
