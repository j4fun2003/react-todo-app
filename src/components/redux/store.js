import { createStore , applyMiddleware, compose} from 'redux';
import rootReducer from './root';
import {thunk} from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer ,composeEnhancers(
    applyMiddleware(thunk) // Sử dụng Redux Thunk middleware
  ) );

export default store;
