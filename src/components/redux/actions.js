
import { getDatabase, set, ref, update, remove, get } from 'firebase/database';
import { app } from '../database/firebase'
export const ADD_ITEM = 'ADD_ITEM';
export const TOGGLE_ITEM_STATUS = 'TOGGLE_ITEM_STATUS';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_COMPLETED = 'DELETE_COMPLETED';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const SELECT_ITEM = 'SELECT_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_LOADING = 'SET_LOADING';
export const SET_FILTER = 'SET_FILTER';
export const FETCH_DATA = 'FETCH_DATA';
export const SELECT_STATUS = 'SELECT_STATUS';
export const FILTER = {
  ALL: 'ALL',
  ACTIVE: false,
  COMPLETED: true
}
const db = getDatabase(app);

export const addItem = (content) => {
  return async (dispatch , getState) => {
    try {
      const state = getState();
      const currentItemCount = state.items.items.length;
      const itemRef = ref(db, '/items/' + currentItemCount);
      const item = { itemId: currentItemCount, content, completed: false };
      await set(itemRef, item);
      dispatch({
        type: ADD_ITEM,
        payload: item
      });
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  };
};

export const toggleItemStatus = (key) => {
  return async (dispatch) => {
    try {
      const itemRef = ref(db, '/items/' + key);
      const item = (await get(itemRef)).val();
      const updatedItem = {
        ...item,
        completed: !item.completed,
      };
      await update(itemRef, updatedItem);
      dispatch({
        type: TOGGLE_ITEM_STATUS,
        payload: key
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };
};

export const deleteItem = (key) => {
  return async (dispatch) => {
    try {
      await remove(ref(db, '/items/' + key));
      dispatch({
        type: DELETE_ITEM,
        payload: key
      });
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };
};

export const deleteCompleted = () => ({
  type: DELETE_COMPLETED
});

export const toggleAll = () => ({
  type: TOGGLE_ALL
});

export const selectItem = (key) => {
  return (dispatch , getState) => {
  const state = getState();

  const item = state.items.filter(item => item.itemId === key);
  debugger;
  dispatch({
    type: SELECT_ITEM,
    payload: item
  });
};
};

export const updateItem = (key, content) => {
  return async (dispatch) => {
    try {
      const itemRef = ref(db, '/items/' + key);
      const item = (await get(itemRef)).val();
      const updatedItem = {
        ...item,
        content: content,
      };
      await update(itemRef, updatedItem);
      dispatch({
        type: UPDATE_ITEM,
        payload: { key, content }
      });
    } catch (error) {
      console.error('Error updating item: ', error);
    }
  };
};


export const fetchData = (data) => ({
  type: FETCH_DATA,
  payload: data
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

export const selectByStatus = (status) => ({
  type: SELECT_STATUS,
  payload: status
});
