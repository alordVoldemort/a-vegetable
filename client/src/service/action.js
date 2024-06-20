export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const apiRequest = () => ({
  type: FETCH_REQUEST
});

export const apiSuccess = (apiResponce) => ({
  type: FETCH_SUCCESS,
  payload: apiResponce
});

export const apiFailure = (error) => ({
  type: FETCH_FAILURE,
  payload: error
});