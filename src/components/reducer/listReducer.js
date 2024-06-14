import { produce } from 'immer';
import { ADD_ITEM, TOGGLE_ITEM_STATUS, DELETE_ITEM, DELETE_COMPLETED, TOGGLE_ALL, UPDATE_ITEM, FETCH_DATA , SELECT_STATUS } from '../redux/actions';
// let index = 0;

const initialState = {
  items: [],
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return produce(state, (draft) => {
        draft.items = action.payload;
      });
    case ADD_ITEM:
      return produce(state, (draft) => {
        draft.items.push(action.payload);
      });
      case TOGGLE_ITEM_STATUS:
        const updatedItems = state.items.map(item =>
          item.itemId === action.payload ? { ...item, completed: !item.completed } : item
        );
        return {
          ...state,
          items: updatedItems
        };
  

    case DELETE_ITEM:
      return produce(state, (draft) => {
        draft.items = draft.items.filter(item => item.itemId !== action.payload);
      });

    case DELETE_COMPLETED:
      return produce(state, (draft) => {
        draft.items = draft.items.filter(item => !item.completed);
      });

    case TOGGLE_ALL:
      return produce(state, (draft) => {
        const allCompleted = draft.items.every(item => item.completed);
        draft.items.forEach(item => {
          item.completed = !allCompleted;
        });
      });

    case UPDATE_ITEM:
        const { key , content } = action.payload;
        const oldItem = key.itemId;
        const newItems = state.items.map(item =>
          item.itemId === oldItem ? { ...item, content: content } : item
        );
        return {
          ...state,
          items: newItems
        };
    case SELECT_STATUS:
      return produce(state, (draft) => {
        if(action.payload === true) {
          draft.items = draft.items.filter(item => item.completed === true); 
        }else{
          draft.items = draft.items.filter(item => item.completed === false); 
        }
      });
    default:
      return state;
  }
};

export default listReducer;

