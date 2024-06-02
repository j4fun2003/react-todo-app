import { produce } from 'immer';
import { ADD_ITEM, TOGGLE_ITEM_STATUS, DELETE_ITEM, DELETE_COMPLETED, TOGGLE_ALL, UPDATE_ITEM, FETCH_DATA , SELECT_STATUS } from '../redux/actions';
// let index = 0;

const initialState = [];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return produce(state, (draft) => {
        return action.payload;
      });
    case ADD_ITEM:
      return produce(state, (draft) => {
        draft.push(action.payload);
      });
      case TOGGLE_ITEM_STATUS:
        return produce(state, (draft) => {
          const item = draft.find(item => item.itemId === action.payload);
          if (item) {
            item.completed = !item.completed;
          } else {
            console.log("Item không tồn tại");
          }
        });
    case DELETE_ITEM:
      return produce(state, (draft) => {
        draft = draft.filter(item => item.itemId !== action.payload);
      });

    case DELETE_COMPLETED:
      return produce(state, (draft) => {
        draft = draft.filter(item => !item.completed);
      });

    case TOGGLE_ALL:
      return produce(state, (draft) => {
        const allCompleted = draft.every(item => item.completed);
        draft.forEach(item => {
          item.completed = !allCompleted;
        });
      });

    case UPDATE_ITEM:
      return produce(state, (draft) => {
        const { itemId, content } = action.payload;
        const item = draft.find(item => item.itemId === itemId);
        if (item) {
          item.content = content;
        }
      });
    case SELECT_STATUS:
      return produce(state, (draft) => {
        if(action.payload === true) {
          draft = draft.filter(item => item.completed === true); 
        }else{
          draft = draft.filter(item => item.completed === false); 
        }
      });
    default:
      return state;
  }
};

export default listReducer;

