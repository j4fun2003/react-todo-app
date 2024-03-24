import React from "react";

class TodoItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
        }
    }

    
  handleDoubleClick = () =>{
    this.setState({isEditing : true})
  };


    render(){
        const {isEditing} = this.state;
        const {item,handleOnChange,handleEdit,handleIsActive,handleDeleteItem} = this.props;
        return (
        <li key={item.itemId} className={item.completed ? 'completed todo-item' : 'todo-item'} onDoubleClick={() => this.handleDoubleClick()}>
        <div className="view row">

          {isEditing ? (
            <input type="text" className='input-text' value={item.newContent} onChange={(e) => handleOnChange(item.itemId, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { handleEdit(item.itemId); this.setState({isEditing:false}) } }}
              onBlur={() => { handleEdit(item.itemId);  this.setState({isEditing:false})}}
            />
          ) : (
            <>
              <input type="checkbox" checked={item.completed} onChange={() => handleIsActive(item.itemId)} className="select-item col" />
              <label htmlFor="item" className="item col-10">{item.content}</label>
              <button className="col delete-item">
                <i className="fa fa-times" aria-hidden="true" onClick={() => handleDeleteItem(item.itemId)}></i>
              </button>
            </>
          )}

        </div>
      </li>
    )}
}

export default TodoItem;