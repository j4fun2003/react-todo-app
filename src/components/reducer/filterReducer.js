import { SET_FILTER , FILTER }from '../redux/actions';

const initialState = FILTER.ALL;

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
