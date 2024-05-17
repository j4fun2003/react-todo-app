export const ADD_ITEM = 'ADD_ITEM';
export const TOGGLE_ITEM_STATUS = 'TOGGLE_ITEM_STATUS';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_COMPLETED = 'DELETE_COMPLETED';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const SELECT_ITEM = 'SELECT_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_LOADING = 'SET_LOADING';
export const SET_FILTER = 'SET_FILTER';
export const FILTER = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export const addItem = (content) => ({
  type: ADD_ITEM,
  payload: content
});

export const toggleItemStatus = (itemId) => ({
  type: TOGGLE_ITEM_STATUS,
  payload: itemId
});

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId
});

export const deleteCompleted = () => ({
  type: DELETE_COMPLETED
});

export const toggleAll = () => ({
  type: TOGGLE_ALL
});

export const selectItem = (itemId) => ({
  type: SELECT_ITEM,
  payload: itemId
});

export const updateItem = (itemId, content) => ({
  type: UPDATE_ITEM,
  payload: { itemId, content }
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

