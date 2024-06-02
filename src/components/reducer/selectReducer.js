import { SELECT_ITEM } from '../redux/actions';
import { produce } from 'immer';

const initialState = {};

const selectedItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return produce(state, draft => {
        return action.payload;
      });
    default:
      return state;
  }
};

export default selectedItemReducer;
