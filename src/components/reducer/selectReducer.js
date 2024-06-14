import { SELECT_ITEM , CLEAR_SELECTED_ITEM} from '../redux/actions';

const initialState = null;

const selectedItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return action.payload;
    case CLEAR_SELECTED_ITEM:
      return null;
    default:
      return state;
  }
};

export default selectedItemReducer;
