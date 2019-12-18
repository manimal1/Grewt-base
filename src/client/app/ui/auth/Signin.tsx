import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { userSignin } from 'resources/user/user.actions';
import { BasicForm } from 'components';

interface SigninProps extends RouteComponentProps {
  userSignin: (userData: any, history: any) => void;
  user: object;
}

interface SigninState {
  email: string;
  password: string;
  [x: string]: string;
}

class Signin extends Component<SigninProps, SigninState> {
  constructor(props: SigninProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.props.userSignin(user, this.props.history);
  };

  render(): React.ReactNode {
    const { email, password } = this.state;
    const { onChange, onSubmit } = this;
    const titleLabel = 'Sign in';
    const buttonLabel = 'Submit';
    const inputItems = [
      { key: 'signin-email-key', label: 'email', type: 'email', value: email },
      { key: 'signin-password-key', label: 'password', type: 'text', value: password }
    ];

    return (
      <BasicForm
        {...{
          titleLabel,
          buttonLabel,
          inputItems,
          onChange,
          onSubmit
        }}
      />
    );
  }
}

const mapStateToProps = (state: { auth: any }): object => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { userSignin }
)(withRouter(Signin));
