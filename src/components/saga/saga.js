import { call, put, takeEvery, select } from 'redux-saga/effects';
import { addItemToDatabase, toggleItemStatusInDatabase, deleteItemFromDatabase, updateItemInDatabase , fetchDataInDatabase , deleteCompletedInDatabase} from '../api/api';
import { 
  ADD_ITEM_REQUEST, ADD_ITEM, 
  TOGGLE_ITEM_STATUS_REQUEST, TOGGLE_ITEM_STATUS, 
  DELETE_ITEM_REQUEST, DELETE_ITEM, 
  UPDATE_ITEM_REQUEST, UPDATE_ITEM,
  FETCH_DATA_REQUEST, FETCH_DATA,
  DELETE_COMPLETED_REQUEST, DELETE_COMPLETED, CLEAR_SELECTED_ITEM
} from '../redux/actions';

function* addItemSaga(action) {
  try {
    const state = yield select();
    const currentItemCount = state.items.items.length;
    const item = { itemId: currentItemCount, content: action.payload, completed: false };
    yield put({ type: ADD_ITEM, payload: item });
    yield call(addItemToDatabase, item);
  } catch (error) {
    console.error('Error adding item: ', error);
  }
}

function* toggleItemStatusSaga(action) {
  try {
    yield put({ type: TOGGLE_ITEM_STATUS, payload: action.payload});
    yield call(toggleItemStatusInDatabase, action.payload);
  } catch (error) {
    console.error('Error: ', error);
  }
}


function* deleteItemSaga(action) {
  try {
    yield put({ type: DELETE_ITEM, payload: action.payload });
    yield call(deleteItemFromDatabase, action.payload);
  } catch (error) {
    console.error('Error deleting item: ', error);
  }
}

function* deletedCompleted(){
  try{
    yield put({ type: DELETE_COMPLETED });
    yield call(deleteCompletedInDatabase);
  }catch (error) {
    console.error('Error deleting item: ', error);
  }
}

function* updateItemSaga(action) {
  try {
    debugger
    yield put({ type: UPDATE_ITEM, payload: { key: action.payload.item, content: action.payload.content } });
    yield call(updateItemInDatabase, action.payload.item, action.payload.content);
    yield put({ type: CLEAR_SELECTED_ITEM });
  } catch (error) {
    console.error('Error updating item: ', error);
  }
}

function* fetchData() {
    try{
        const data = yield call(fetchDataInDatabase);
        yield put({type: FETCH_DATA , payload: data});
    } catch (error) {
        console.error('Error fetch item: ', error);
      }
}

function* rootSaga() {
  yield takeEvery(ADD_ITEM_REQUEST, addItemSaga);
  yield takeEvery(TOGGLE_ITEM_STATUS_REQUEST, toggleItemStatusSaga);
  yield takeEvery(DELETE_ITEM_REQUEST, deleteItemSaga);
  yield takeEvery(UPDATE_ITEM_REQUEST, updateItemSaga);
  yield takeEvery(FETCH_DATA_REQUEST, fetchData);
  yield takeEvery(DELETE_COMPLETED_REQUEST, deletedCompleted);
}

export default rootSaga;
