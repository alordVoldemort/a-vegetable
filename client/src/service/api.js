
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from './action';

const LOGIN_URL = 'http://localhost:8000/';

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(LOGIN_URL+`api/login`, credentials);
      dispatch(loginSuccess(response.data));
      return response.data;  

    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error; 

    }
  };
};



