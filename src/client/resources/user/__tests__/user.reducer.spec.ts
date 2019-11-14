import reducer from '../user.reducer';
import { USER } from '../user.constants';

const {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} = USER;

const mockUser = {
  firstname: 'Tom',
  lastname: 'Baker',
  email: 'tom.baker@got.com',
  password: 'password'
};

const mockInitialState = {
  isAuthenticated: false,
  isFetching: false,
  user: {}
};

const mockIsFetchingState = {
  isAuthenticated: false,
  isFetching: true,
  user: {}
};

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {
        type: '',
        payload: {}
      })
    ).toEqual(mockInitialState);
  });

  it('should handle SIGNUP_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: SIGNUP_REQUEST,
        payload: {}
      })
    ).toEqual(mockIsFetchingState);
  });

  it('should handle SIGNUP_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: SIGNUP_SUCCESS,
        payload: mockUser
      })
    ).toEqual(mockInitialState);
  });

  it('should handle SIGNUP_FAIL', () => {
    expect(
      reducer(undefined, {
        type: SIGNUP_FAIL,
        payload: {}
      })
    ).toEqual(mockInitialState);
  });

  it('should handle SIGNIN_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: SIGNIN_REQUEST,
        payload: {}
      })
    ).toEqual(mockIsFetchingState);
  });

  it('should handle SIGNIN_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: SIGNIN_SUCCESS,
        payload: mockUser
      })
    ).toEqual({
      user: mockUser,
      isAuthenticated: true,
      isFetching: false
    });
  });

  it('should handle SIGNIN_FAIL', () => {
    expect(
      reducer(undefined, {
        type: SIGNIN_FAIL,
        payload: {}
      })
    ).toEqual(mockInitialState);
  });
});
