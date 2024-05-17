import { createStore } from 'redux';
import todoReducer from '../reducer/reducer';

const store = createStore(todoReducer);

export default store;
