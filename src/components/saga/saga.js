import { call, put, takeEvery, select ,all} from 'redux-saga/effects';
import { addItemToDatabase, toggleItemStatusInDatabase, toggleAllInDatabase ,deleteItemFromDatabase, updateItemInDatabase, fetchDataInDatabase, deleteCompletedInDatabase } from '../api/api';
import {
  ADD_ITEM_REQUEST, ADD_ITEM,
  TOGGLE_ITEM_STATUS_REQUEST, TOGGLE_ITEM_STATUS,
  DELETE_ITEM_REQUEST, DELETE_ITEM,
  UPDATE_ITEM_REQUEST, UPDATE_ITEM,
  FETCH_DATA_REQUEST, FETCH_DATA,
  DELETE_COMPLETED_REQUEST, DELETE_COMPLETED, CLEAR_SELECTED_ITEM,
  TOGGLE_ALL_REQUEST , TOGGLE_ALL
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

function* watchAddItem() {
  yield takeEvery(ADD_ITEM_REQUEST, addItemSaga);
}

function* toggleItemStatusSaga(action) {
  try {
    yield put({ type: TOGGLE_ITEM_STATUS, payload: action.payload });
    yield call(toggleItemStatusInDatabase, action.payload);
  } catch (error) {
    console.error('Error: ', error);
  }
}

function* watchToggleItemStatus() {
  yield takeEvery(TOGGLE_ITEM_STATUS_REQUEST, toggleItemStatusSaga);
}

function* toggleAllToggleItemStatus() {
  try{
    yield put({type : TOGGLE_ALL});
    yield call(toggleAllInDatabase);
  }catch(error){
    console.error('Error' + error);
  }
}

function* watchToggleAll() {
  yield takeEvery(TOGGLE_ALL_REQUEST, toggleAllToggleItemStatus);
}

function* deleteItemSaga(action) {
  try {
    yield put({ type: DELETE_ITEM, payload: action.payload });
    yield call(deleteItemFromDatabase, action.payload);
  } catch (error) {
    console.error('Error deleting item: ', error);
  }
}

function* watchDeleteItem() {
  yield takeEvery(DELETE_ITEM_REQUEST, deleteItemSaga);
}

function* deletedCompleted() {
  try {
    yield put({ type: DELETE_COMPLETED });
    yield call(deleteCompletedInDatabase);
  } catch (error) {
    console.error('Error deleting item: ', error);
  }
}

function* watchDeleteCompleted() {
  yield takeEvery(DELETE_COMPLETED_REQUEST, deletedCompleted);
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

function* watchUpdateItem() {
  yield takeEvery(UPDATE_ITEM_REQUEST, updateItemSaga);
}

function* fetchData() {
  try {
    const data = yield call(fetchDataInDatabase);
    yield put({ type: FETCH_DATA, payload: data });
  } catch (error) {
    console.error('Error fetch item: ', error);
  }
}

function* watchFetchData() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchData);
}

function* rootSaga() {
  yield all(
    [
      watchAddItem(),
      watchToggleItemStatus(),
      watchDeleteItem(),
      watchDeleteCompleted(),
      watchUpdateItem(),
      watchFetchData(),
      watchToggleAll()
    ]
  )
}

export default rootSaga;
