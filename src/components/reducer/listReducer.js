import {produce} from 'immer';
import { ADD_ITEM, TOGGLE_ITEM_STATUS, DELETE_ITEM, DELETE_COMPLETED, TOGGLE_ALL, UPDATE_ITEM,  FILTER  } from '../redux/actions';
let index = 0;

const initialState = {
  [FILTER.ALL]: [
    { content: '0', completed: false, itemId: index++ },
    { content: '1', completed: false, itemId: index++ },
    { content: '2', completed: false, itemId: index++ },
    { content: '3', completed: false, itemId: index++ },
    { content: '4', completed: false, itemId: index++ },
    { content: '5', completed: false, itemId: index++ },
    { content: '6', completed: false, itemId: index++ },
    { content: '7', completed: false, itemId: index++ },
    { content: '8', completed: false, itemId: index++ },
    { content: '9', completed: false, itemId: index++ },
    { content: '10', completed: false, itemId: index++ },
    { content: '11', completed: false, itemId: index++ },
    { content: '12', completed: false, itemId: index++ },
    { content: '13', completed: false, itemId: index++ },
    { content: '14', completed: false, itemId: index++ },
    { content: '15', completed: false, itemId: index++ }
  ],
  [FILTER.ACTIVE]: [
    { content: '0', completed: false, itemId: index++ },
    { content: '1', completed: false, itemId: index++ },
    { content: '2', completed: false, itemId: index++ },
    { content: '3', completed: false, itemId: index++ },
    { content: '4', completed: false, itemId: index++ },
    { content: '5', completed: false, itemId: index++ },
    { content: '6', completed: false, itemId: index++ },
    { content: '7', completed: false, itemId: index++ },
    { content: '8', completed: false, itemId: index++ },
    { content: '9', completed: false, itemId: index++ },
    { content: '10', completed: false, itemId: index++ },
    { content: '11', completed: false, itemId: index++ },
    { content: '12', completed: false, itemId: index++ },
    { content: '13', completed: false, itemId: index++ },
    { content: '14', completed: false, itemId: index++ },
    { content: '15', completed: false, itemId: index++ }
  ],
  [FILTER.COMPLETED]: []
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return produce(state, (draft) => {
        const newItem = { content: action.payload, completed: false, itemId: index++ };
        draft[FILTER.ALL].push(newItem);
        draft[FILTER.ACTIVE].push(newItem);
      });

    case TOGGLE_ITEM_STATUS:
      return produce(state, (draft) => {
        const itemIndex = draft[FILTER.ALL].findIndex(item => item.itemId === action.payload);
        const item = draft[FILTER.ALL][itemIndex];
        item.completed = !item.completed;
        if (item.completed) {
          draft[FILTER.COMPLETED].push(item);
          draft[FILTER.ACTIVE] = draft[FILTER.ACTIVE].filter(item => item.itemId !== action.payload);
        } else {
          draft[FILTER.ACTIVE].push(item);
          draft[FILTER.COMPLETED] = draft[FILTER.COMPLETED].filter(item => item.itemId !== action.payload);
        }
      });

    case DELETE_ITEM:
      return produce(state, (draft) => {
        draft[FILTER.ALL] = draft[FILTER.ALL].filter(item => item.itemId !== action.payload);
        draft[FILTER.ACTIVE] = draft[FILTER.ACTIVE].filter(item => item.itemId !== action.payload);
        draft[FILTER.COMPLETED] = draft[FILTER.COMPLETED].filter(item => item.itemId !== action.payload);
      });

    case DELETE_COMPLETED:
      return produce(state, (draft) => {
        draft[FILTER.ALL] = draft[FILTER.ALL].filter(item => !item.completed);
        draft[FILTER.COMPLETED] = [];
      });

    case TOGGLE_ALL:
      return produce(state, (draft) => {
        const allCompleted = draft[FILTER.ALL].every(item => item.completed);
        draft[FILTER.ALL].forEach(item => {
          item.completed = !allCompleted;
        });
        if (allCompleted) {
          draft[FILTER.COMPLETED] = [];
          draft[FILTER.ACTIVE] = [...draft[FILTER.ALL]];
        } else {
          draft[FILTER.COMPLETED] = [...draft[FILTER.ALL]];
          draft[FILTER.ACTIVE] = [];
        }
      });

    case UPDATE_ITEM:
      return produce(state, (draft) => {
        const { itemId, content } = action.payload;
        const itemIndex = draft[FILTER.ALL].findIndex(item => item.itemId === itemId);
        if (itemIndex !== -1) {
          draft[FILTER.ALL][itemIndex].content = content;
          const activeIndex = draft[FILTER.ACTIVE].findIndex(item => item.itemId === itemId);
          if (activeIndex !== -1) {
            draft[FILTER.ACTIVE][activeIndex].content = content;
          }
          const completedIndex = draft[FILTER.COMPLETED].findIndex(item => item.itemId === itemId);
          if (completedIndex !== -1) {
            draft[FILTER.COMPLETED][completedIndex].content = content;
          }
        }
      });

    default:
      return state;
  }
};

export default listReducer;
