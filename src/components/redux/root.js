import { combineReducers } from 'redux';
import listReducer from '../reducer/listReducer';
import filterReducer from '../reducer/filterReducer';
import selectedItemReducer from '../reducer/selectReducer';

const rootReducer = {
    items: listReducer,
    // filter: filterReducer,
    // selectedItem: selectedItemReducer,
  };
  
  export default rootReducer;