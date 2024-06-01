import { applyMiddleware, createStore } from 'redux';
import authReducer from 'service/reducer';

import {thunk} from 'redux-thunk'; // Correct import

const store = createStore(authReducer, applyMiddleware(thunk));
export default store;