
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from './action';

const initialState = {
 auth:{
  loading: false,
  data: null,
  error: null
 } 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;