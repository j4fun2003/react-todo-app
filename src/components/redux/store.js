import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, compose} from 'redux';
import rootReducer from './root';
import {thunk} from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/saga';

// 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer : rootReducer ,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // cái này tham khảo, dùng để xem state reducer , dòng này kích hoạt redux devtools
});

sagaMiddleware.run(rootSaga);

export default store;
