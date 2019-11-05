import axios from 'axios';

export const setAuthToken = (token: string | null): void => {
  if (token) {
    // apply to every request
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common.Authorization;
  }
};
