import { SELECT_ITEM } from '../redux/actions';

const initialState = null;

const selectedItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return action.payload;
    default:
      return state;
  }
};

export default selectedItemReducer;
