import { SET_FILTER , FILTER }from '../redux/actions';
import { produce } from 'immer';

const initialState = FILTER.ALL;

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
        return produce(state, (draft) => {
          draft.filter = action.payload;
        });
    default:
      return state;
  }
};

export default filterReducer;
