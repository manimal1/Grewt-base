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

export const userSignInRequest = (): { type: string } => ({ type: SIGNIN_REQUEST });

export const userSignInSuccess = (decoded: object): { type: string; payload: object } => ({
  type: SIGNIN_SUCCESS,
  payload: decoded
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
    .post('/signup', userData)
    .then(res => {
      dispatch(userSignUpSuccess(res));
      history.push('/');
    })
    .catch(err => dispatch(userSignUpFail(err)));
};

export const userSignin = (userData: any, history: any) => (dispatch: any): Promise<void> => {
  dispatch(userSignInRequest());
  return axios
    .post('/signin', userData)
    .then(res => {
      const { token } = res.data;
      // add token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded: object = jwtDecode(token);
      // set current user
      dispatch(userSignInSuccess(decoded));
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
