import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './Routes';

function App(): JSX.Element {
  return (
    <React.Fragment>
      <CssBaseline />
      <Routes />
    </React.Fragment>
  );
}

export default App;
