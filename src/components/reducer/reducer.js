import { produce } from 'immer';
import {
  ADD_ITEM,
  TOGGLE_ITEM_STATUS,
  DELETE_ITEM,
  DELETE_COMPLETED,
  TOGGLE_ALL,
  SELECT_ITEM,
  UPDATE_ITEM,
  SET_LOADING,
  SET_FILTER,
  FILTER
} from '../redux/actions';

let index = 0;

const initialState = {
  list: {
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
  },
  filter: FILTER.ALL,
  loading: false,
  selectedItem: null
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return produce(state, (draft) => {
        const newItem = { content: action.payload, completed: false, itemId: index++ };
        draft.list[FILTER.ALL].push(newItem);
        draft.list[FILTER.ACTIVE].push(newItem);
      });

    case TOGGLE_ITEM_STATUS:
      return produce(state, (draft) => {
        const itemIndex = draft.list[FILTER.ALL].findIndex(item => item.itemId === action.payload);
        const item = draft.list[FILTER.ALL][itemIndex];
        item.completed = !item.completed;
        if (item.completed) {
          draft.list[FILTER.COMPLETED].push(item);
          draft.list[FILTER.ACTIVE] = draft.list[FILTER.ACTIVE].filter(item => item.itemId !== action.payload);
        } else {
          draft.list[FILTER.ACTIVE].push(item);
          draft.list[FILTER.COMPLETED] = draft.list[FILTER.COMPLETED].filter(item => item.itemId !== action.payload);
        }
      });

    case DELETE_ITEM:
      return produce(state, (draft) => {
        draft.list[FILTER.ALL] = draft.list[FILTER.ALL].filter(item => item.itemId !== action.payload);
        draft.list[FILTER.ACTIVE] = draft.list[FILTER.ACTIVE].filter(item => item.itemId !== action.payload);
        draft.list[FILTER.COMPLETED] = draft.list[FILTER.COMPLETED].filter(item => item.itemId !== action.payload);
      });

    case DELETE_COMPLETED:
      return produce(state, (draft) => {
        draft.list[FILTER.ALL] = draft.list[FILTER.ALL].filter(item => !item.completed);
        draft.list[FILTER.COMPLETED] = [];
      });

    case TOGGLE_ALL:
      return produce(state, (draft) => {
        const allCompleted = draft.list[FILTER.ALL].every(item => item.completed);
        draft.list[FILTER.ALL].forEach(item => {
          item.completed = !allCompleted;
        });
        if (allCompleted) {
          draft.list[FILTER.COMPLETED] = [];
          draft.list[FILTER.ACTIVE] = [...draft.list[FILTER.ALL]];
        } else {
          draft.list[FILTER.COMPLETED] = [...draft.list[FILTER.ALL]];
          draft.list[FILTER.ACTIVE] = [];
        }
      });

    case SELECT_ITEM:
      return produce(state, (draft) => {
        draft.selectedItem = draft.list[FILTER.ALL].find(item => item.itemId === action.payload);
      });

    case UPDATE_ITEM:
      return produce(state, (draft) => {
        const { itemId, content } = action.payload;
        const itemIndex = draft.list[FILTER.ALL].findIndex(item => item.itemId === itemId);
        if (itemIndex !== -1) {
          draft.list[FILTER.ALL][itemIndex].content = content;
          const activeIndex = draft.list[FILTER.ACTIVE].findIndex(item => item.itemId === itemId);
          if (activeIndex !== -1) {
            draft.list[FILTER.ACTIVE][activeIndex].content = content;
          }
          const completedIndex = draft.list[FILTER.COMPLETED].findIndex(item => item.itemId === itemId);
          if (completedIndex !== -1) {
            draft.list[FILTER.COMPLETED][completedIndex].content = content;
          }
        }
      });

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_FILTER:
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

export default todoReducer;
