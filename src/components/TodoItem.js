import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      // isEditing: false
    }
  }

  // handleDoubleClick = () =>{
  //   this.setState({isEditing : true})
  // };


  render() {
    // const {isEditing} = this.state;
    const { item, /*handleOnChange, handleEdit,*/ handleIsActive, handleDeleteItem , selectItem} = this.props;
    return (
      <li key={item.itemId} className={item.completed ? 'completed todo-item' : 'todo-item'}>
        <div className="view row">
          {/* {isEditing ? (
            <input type="text" className='input-text' value={item.newContent} onChange={(e) => handleOnChange(item.itemId, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { handleEdit(item.itemId); this.setState({ isEditing: false }) } }}
              onBlur={() => { handleEdit(item.itemId); this.setState({ isEditing: false }) }}
            />
          ) : ( */}
            <>
              <input type="checkbox"  checked={item.completed} onChange={() => handleIsActive(item.itemId)} className="select-item col" />
              <label htmlFor="item" className="item col-9">{item.content}</label>
              <button className="col edit-item" onClick={() => selectItem(item.itemId)}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <button className="col delete-item" onClick={() => handleDeleteItem(item.itemId)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </>
          {/* )} */}
        </div>
      </li>
    )
  }
}

export default TodoItem;