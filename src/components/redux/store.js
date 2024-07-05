import { configureStore, createReducer } from '@reduxjs/toolkit'
import { applyMiddleware, compose} from 'redux';
import rootReducer from './root';
import {thunk} from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/saga';
import { createReducerManager } from '../reducer/reducerManager';

// 
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducerManager = createReducerManager(rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer : reducerManager.reduce ,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // cái này tham khảo, dùng để xem state reducer , dòng này kích hoạt redux devtools
});

store.reducerManager = reducerManager;

sagaMiddleware.run(rootSaga);

export default store;
