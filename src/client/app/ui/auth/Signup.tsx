import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { userSignup } from 'resources/user/user.actions';
import { BasicForm } from 'components';

interface SignupProps extends RouteComponentProps {
  userSignup: (userData: any, history: any) => void;
  user: object;
  auth: any;
}

interface SignupState {
  email: string;
  password: string;
  name: string;
  [x: string]: string;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };

    this.props.userSignup(newUser, this.props.history);
  }

  render() {
    const { email, password, name } = this.state;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const titleLabel = 'Sign up';
    const buttonLabel = 'Register';
    const inputItems = [
      { label: 'name', type: 'text', value: name },
      { label: 'email', type: 'email', value: email },
      { label: 'password', type: 'password', value: password }
    ];

    return (
      <BasicForm
        {...{
          titleLabel,
          buttonLabel,
          inputItems,
          email,
          password,
          name,
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
  { userSignup }
)(withRouter(Signup));
