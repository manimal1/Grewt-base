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
  const isFetchingState = { ...state, isFetching: true };

  switch (type) {
    case SIGNUP_REQUEST:
      return isFetchingState;
    case SIGNUP_SUCCESS:
      return { ...state };
    case SIGNUP_FAIL:
      return { ...state };
    case SIGNIN_REQUEST:
      return isFetchingState;
    case SIGNIN_FAIL:
      return { ...state };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    default:
      return state;
  }
};

export default authReducer;
