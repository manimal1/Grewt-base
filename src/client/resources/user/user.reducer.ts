import { isEmpty } from 'lodash';
import { USER } from './user.constants';

const {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} = USER;

interface ReducerAction {
  type: string;
  payload: any;
}

interface AuthState {
  isAuthenticated?: boolean;
  isFetching?: boolean;
  user?: object;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  user: {}
};

const authReducer = (state: AuthState = initialState, action: ReducerAction): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        isFetching: false,
        user: payload
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default authReducer;
