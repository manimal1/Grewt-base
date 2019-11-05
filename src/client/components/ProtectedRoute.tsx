import React from 'react';
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

interface StateProps {
  auth: {
    isAuthenticated: boolean;
  };
}

interface ProtectedRouteProps extends RouteComponentProps {
  auth: {
    isAuthenticated: boolean;
  };
  path: string;
  component: any;
  exact?: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { target: props.location } }} />
      )
    }
  />
);

const mapStateToProps = (state: StateProps) => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(ProtectedRoute));
