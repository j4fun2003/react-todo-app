import React from 'react';
import { FILTER, completed } from '../App';
import TodoItem from './TodoItem';

class Content extends React.PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const { list, filter } = this.props;
    let filteredList = list;
    if (filter === FILTER.ACTIVE) {
      filteredList = list.filter(item => !item.completed);
    } else if (filter === FILTER.COMPLETED) {
      filteredList = list.filter(item => item.completed);
    }

    return (
      <main>
        {this.props.list.length > 0 && (
          <input type="checkbox" className="select-all" onChange={this.props.handleToggleAll}></input>
        )}
        <ul id="todo-list">
          {filteredList.map((item) =>
           <TodoItem
           list={this.props.list}
           item={item}
           key = {item.itemId}
          //  handleDoubleClick={this.props.handleDoubleClick}
           handleOnChange={this.props.handleOnChange}
           handleEdit={this.props.handleEdit}
           handleIsActive={this.props.handleIsActive}
           handleDeleteItem={this.props.handleDeleteItem}/>
          )}
        </ul>
      </main>
    );
  }


}

export default Content;