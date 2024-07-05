import React , {useContext} from "react";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ThemeContext } from "../assets/javascript/theme-context";
import selectedItemReducer from './reducer/selectReducer';
import {
  toggleItemStatus,
  deleteItem,
  selectItem
} from '../components/redux/actions';
import store from "./redux/store";

const TodoItem = ({item}) => {
    const {theme} = useContext(ThemeContext);
    const dispatch = useDispatch();

    const handleStatus = (id) => {
      dispatch(toggleItemStatus(id));
    };

    const handleDeleteItem = (id) => {
      dispatch(deleteItem(id));
    }

    const handleSelect = (item) => {
      store.reducerManager.add('selectedItem', selectedItemReducer);
      dispatch(selectItem(item));
      }

    return (
      <li key={item.itemId} className={item.completed ? 'completed todo-item' : 'todo-item'}  style={{ backgroundColor: theme.background,color: theme.foreground}}>
        <div className="view row">
            <>
              <input type="checkbox"  checked={item.completed} onChange={() => handleStatus(item.itemId)} className="select-item col" />
              <label htmlFor="item" className="item col-9">{item.content}</label>
              <button className="col edit-item" onClick={() => handleSelect(item)} style={{ backgroundColor: theme.background,color: theme.foreground}}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <button className="col delete-item" onClick={() => handleDeleteItem(item.itemId)} style={{ backgroundColor: theme.background,color: theme.foreground}}>
                <i className="fa fa-times" aria-hidden="true"></i>
                
              </button>
            </>
        </div>
      </li>
    )
  }


TodoItem.propTypes = { 
  item : PropTypes.object.isRequired,
  handleStatus : PropTypes.func,
  handleDeleteItem : PropTypes.func,
  selectItem : PropTypes.func
}

export default TodoItem;