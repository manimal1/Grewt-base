import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'core';

import './landing.scss';

interface ButtonProps {
  key: string;
  path: string;
  label: string;
}

const Landing = () => {
  const title = 'Welcome to the Landing Page!';
  const buttons = [
    {
      key: 'sigin',
      path: '/signin',
      label: 'Sign in'
    },
    {
      key: 'signup',
      path: '/signup',
      label: 'Sign up'
    }
  ];

  return (
    <div className="landing">
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <div className="buttons-wrapper">{renderButtons(buttons)}</div>
    </div>
  );
};

function renderButtons(buttons: ButtonProps[]) {
  return buttons.map(button => (
    <Link key={button.key} className="link" to={button.path}>
      <Button variant="contained" color="primary">
        {button.label}
      </Button>
    </Link>
  ));
}

export default Landing;
