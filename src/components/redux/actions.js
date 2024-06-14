
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const TOGGLE_ITEM_STATUS = 'TOGGLE_ITEM_STATUS';
export const TOGGLE_ITEM_STATUS_REQUEST = 'TOGGLE_ITEM_STATUS_REQUEST';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_COMPLETED = 'DELETE_COMPLETED';
export const DELETE_COMPLETED_REQUEST = 'DELETE_COMPLETED_REQUEST';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const SELECT_ITEM = 'SELECT_ITEM';
export const CLEAR_SELECTED_ITEM = 'CLEAR_SELECTED_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const SET_LOADING = 'SET_LOADING';
export const SET_FILTER = 'SET_FILTER';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const SELECT_STATUS = 'SELECT_STATUS';
export const FILTER = {
  ALL: 'ALL',
  ACTIVE: false,
  COMPLETED: true
}

export const addItem = (content) => ({
  type: ADD_ITEM_REQUEST,
  payload: content
});

export const toggleItemStatus = (key) => ({
  type: TOGGLE_ITEM_STATUS_REQUEST,
  payload: key
});

export const deleteItem = (key) => ({
  type: DELETE_ITEM_REQUEST,
  payload: key
});

export const deleteCompleted = () => ({
  type: DELETE_COMPLETED_REQUEST
});


export const toggleAll = () => ({
  type: TOGGLE_ALL
});

export const selectItem = (key) => ({
  type: SELECT_ITEM,
  payload: key
});

export const clearSelectedItem = () => ({
  type: CLEAR_SELECTED_ITEM
});

export const updateItem = (item, content) => ({
  type: UPDATE_ITEM_REQUEST,
  payload: { item, content }
  
});

export const fetchData = () => ({
  type: FETCH_DATA_REQUEST,
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
