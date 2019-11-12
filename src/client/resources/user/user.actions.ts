import axios from 'axios';
import jwtDecode from 'jwt-decode'; // eslint-disable-line camelcase
import { setAuthToken } from 'utils';
import { USER } from './user.constants';

const {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} = USER;

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

interface User {
  firstname?: string;
  lastname?: string;
  email: string;
}

export const userSignInRequest = (): { type: string } => ({ type: SIGNIN_REQUEST });

export const userSignInSuccess = (
  userData: (DecodedToken & User) | {}
): { type: string; payload: (DecodedToken & User) | {} } => ({
  type: SIGNIN_SUCCESS,
  payload: userData
});

export const userSignInFail = (err: any): { type: string; payload: any } => ({
  type: SIGNIN_FAIL,
  payload: err.response.data
});

export const userSignUpRequest = (): { type: string } => ({ type: SIGNUP_REQUEST });

export const userSignUpSuccess = (res: any): { type: string; payload: any } => ({
  type: SIGNUP_SUCCESS,
  payload: res.data
});

export const userSignUpFail = (err: any): { type: string; payload: any } => ({
  type: SIGNUP_FAIL,
  payload: err
});

export const userSignup = (userData: any, history: any) => (dispatch: any): Promise<void> => {
  dispatch(userSignUpRequest());
  return axios
    .post('/auth/signup', userData)
    .then(res => {
      dispatch(userSignUpSuccess(res));
      history.push('/');
    })
    .catch(err => dispatch(userSignUpFail(err)));
};

export const userSignin = (userData: any, history: any) => (dispatch: any): Promise<void> => {
  dispatch(userSignInRequest());
  return axios
    .post('/auth/signin', userData)
    .then(res => {
      const { token, user } = res.data;
      const userObj: User = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      };
      // add token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded: DecodedToken = jwtDecode(token);
      // concat userObj with decoded token info
      const resData = { ...decoded, ...userObj };
      // set current user
      dispatch(userSignInSuccess(resData));
      history.push('/');
    })
    .catch(err => dispatch(userSignInFail(err)));
};

export const userSignout = () => (dispatch: any): Promise<void> => {
  // remove auth header for future requests
  setAuthToken(null);
  // set current user to {} which will set isAuthenticated to false
  return dispatch(userSignInSuccess({}));
};
