import React from "react";
import PropTypes from 'prop-types';
import { ThemeContext } from "../assets/javascript/theme-context";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, handleStatus, handleDeleteItem , selectItem} = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
      <li key={item.itemId} className={item.completed ? 'completed todo-item' : 'todo-item'}  style={{ backgroundColor: theme.background,color: theme.foreground}}>
        <div className="view row">
            <>
              <input type="checkbox"  checked={item.completed} onChange={() => handleStatus(item.itemId)} className="select-item col" />
              <label htmlFor="item" className="item col-9">{item.content}</label>
              <button className="col edit-item" onClick={() => selectItem(item.itemId)} style={{ backgroundColor: theme.background,color: theme.foreground}}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <button className="col delete-item" onClick={() => handleDeleteItem(item.itemId)} style={{ backgroundColor: theme.background,color: theme.foreground}}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </>
        </div>
      </li>
        )}
        </ThemeContext.Consumer>
    )
  }
}

TodoItem.propTypes = { 
  item : PropTypes.object.isRequired,
  handleStatus : PropTypes.func,
  handleDeleteItem : PropTypes.func,
  selectItem : PropTypes.func
}

export default TodoItem;