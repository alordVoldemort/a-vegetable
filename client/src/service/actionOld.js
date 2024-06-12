import axios from 'axios';
import { createAction } from './utils';

export const FETCH_LOGIN = '/public/login';

const token = document.cookie;



export const fetchLoginDetailsSuccess = createAction(FETCH_LOGIN, 'token');

export function fetchUserDetailsOnLogin({ userName, password }) {
  const reqId = `fetchUserDetailsOnLogin-${userName}`;
  const ajax = axios.create({
    baseURL: 'http://localhost:8000', // Fixed baseURL by adding "http://"
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return dispatch => {
    return ajax.post(`/api/login`, { userName, password }) 
      .then(res => {
        console.log(res, 'err...');
        dispatch(receivedResponse(reqId)); 
        return res
        // return dispatch(fetchLoginDetailsSuccess(res.data));
      })
      .catch(ex => {
        console.log(ex); // Log the error here
        // dispatch(receivedResponse(reqId, { error: ex }));
      });
  };
}
