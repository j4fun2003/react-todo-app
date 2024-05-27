import { SET_LOADING } from '../redux/actions';
import { produce } from 'immer';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return produce(state, (draft) => {
        draft.isLoading = action.payload;
      });
    default:
      return state;
  }
};

export default loadingReducer;
