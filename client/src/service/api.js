
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
      const response = await axios.post(BASE_URL + `api/login`, credentials);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};


//dashboard
export const getAllEntries = () => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.get(BASE_URL + `api/records`);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const getAllEntriesBySerach = (client=null, driver=null, city=null, text=null) => {
  console.log(client, driver, city, text, 'asasa')
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.post(BASE_URL + `api/recordsBySerach`, {client, driver, city, text});
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
      const response = await axios.post(BASE_URL + `api/records`, insertRecord);
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
      const response = await axios.put(BASE_URL + `api/records/` + id, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const updateStatus = (id, status) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.put(BASE_URL + `api/records/` + id, {status});
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const deleteEntry = (id = null) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.delete(BASE_URL + `api/records/` + id);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};


// custom entery // city
export const createCityEntry = (insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.post(BASE_URL + `api/cust/city`, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const updateCityEntry = (id, insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.put(BASE_URL + `api/cust/city/` + id, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const deleteCityEntry = (id = null) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.delete(BASE_URL + `api/cust/city/` + id);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

//client 

export const createClientEntry = (insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.post(BASE_URL + `api/cust/clients`, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const updateClientEntry = (id, insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.put(BASE_URL + `api/cust/clients/` + id, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const deleteClientEntry = (id = null) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.delete(BASE_URL + `api/cust/clients/` + id);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

// Driver 

export const createDriverEntry = (insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.post(BASE_URL + `api/cust/drivers`, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const updateDriverEntry = (id, insertRecord) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.put(BASE_URL + `api/cust/drivers/` + id, insertRecord);
      dispatch(apiSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(apiFailure(error.message));
      throw error;
    }
  };
};

export const deleteDriverEntry = (id = null) => {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const response = await axios.delete(BASE_URL + `api/cust/drivers/` + id);
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

