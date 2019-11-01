import React from 'react';

import { SharedComponent } from 'components';
import './home.scss';

interface HomeProps {
  compiler: string;
  framework: string;
}

const Home = (props: HomeProps) => {
  return (
    <React.Fragment>
      <h1 className="home">Hello from your Home Component sir!</h1>
      <SharedComponent />
    </React.Fragment>
  );
};

export default Home;
