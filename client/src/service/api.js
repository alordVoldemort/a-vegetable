
import axios from 'axios';
import { useQuery } from 'react-query';
import { apiFailure, apiRequest, apiSuccess } from './action';

const BASE_URL = 'http://localhost:8000/';

export function useFetch(type, useQueryOptions = {}) {
  return useQuery({
    queryKey: ['useFetchCity', type],
    queryFn: () => {
      return axios.get(BASE_URL + 'api/cust/' + type)
        .then(res => res.data)
        .catch(err => {
          console.error('Error fetching data:', err);
          throw err;
        });
    },
    ...useQueryOptions
  });
}


export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.post(BASE_URL+`api/login`, credentials);
      dispatch(apiSuccess(response.data));
      return response.data;  
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error; 
    }
  };
};



export const getAllEntries = () => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.get(BASE_URL+`api/records`);
      dispatch(apiSuccess(response.data));
      return response.data;  
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error; 
    }
  };
};


export const createEntry = (insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.post(BASE_URL+`api/records`, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;  
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error; 
    }
  };
};


export const updateEntry = (insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.put(BASE_URL+`api/records/`+ id, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;  
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error; 
    }
  };
};


export const deleteEntry = (id=null) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.delete(BASE_URL+`api/records/`+ id);
      dispatch(apiSuccess(response.data));
      return response.data;  
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error; 
    }
  };
};







// export function useFetch(type, useQueryOptions={}){
//   return useQuery(type, () => {
//     return axios.get(BASE_URL + 'api/cust/'+ type)
//       .then(res => res.data)
//       .catch(err => {
//         console.error('Error fetching cities:', err);
//         throw err;
//       });
//   }, useQueryOptions);
// }

