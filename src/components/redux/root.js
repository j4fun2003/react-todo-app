import { combineReducers } from 'redux';
import listReducer from '../reducer/listReducer';
import filterReducer from '../reducer/filterReducer';
import loadingReducer from '../reducer/loadingReducer';
import selectedItemReducer from '../reducer/selectReducer';

const rootReducer = combineReducers({
    list: listReducer,
    filter: filterReducer,
    loading: loadingReducer,
    selectedItem: selectedItemReducer,
  });
  
  export default rootReducer;   