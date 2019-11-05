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

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    };

    this.props.userSignin(user, this.props.history);
  };

  render() {
    const { email, password } = this.state;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const titleLabel = 'Sign in';
    const buttonLabel = 'Submit';
    const inputItems = [
      { label: 'email', type: 'email', value: email },
      { label: 'password', type: 'text', value: password }
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

const mapStateToProps = (state: { auth: any }) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { userSignin }
)(withRouter(Signin));
