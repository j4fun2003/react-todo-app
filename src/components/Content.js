import React from 'react';
import { FILTER } from '../App';
import TodoItem from './TodoItem';
import Page from './Page';

const PAGE_SIZE = 5;
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    }
  }

  handleEdit = (value) => {
    this.setState({ inputValue: value });
  };

  handlePageClick = (pageNumber) => {
    this.setState({ currentPage: pageNumber});
  };

  render() {
    console.log("currentPage",this.state.currentPage);
    console.log('list',this.props.list);
    const totalPages = Math.ceil(this.props.list.length / PAGE_SIZE);
    const { filter } = this.props;
    let filteredList = this.props.list;
    if (filter === FILTER.ACTIVE) {
      filteredList = filteredList.filter(item => !item.completed);
    } else if (filter === FILTER.COMPLETED) {
      filteredList = filteredList.filter(item => item.completed);
    }
    const displayedList = filteredList.slice(
      (this.state.currentPage - 1) * PAGE_SIZE,
      this.state.currentPage * PAGE_SIZE
    );
    console.log("displayList", displayedList)

    return (
      <main>
        {this.props.list.length > 0 && (
          <input type="checkbox" className="select-all" onChange={this.props.handleToggleAll}></input>
        )}
        <ul id="todo-list">
          {displayedList.map((item) =>
            <TodoItem
              onEdit={this.handleEdit}
              list={this.props.list}
              item={item}
              key={item.itemId}
              //  handleDoubleClick={this.props.handleDoubleClick}
              handleOnChange={this.props.handleOnChange}
              handleEdit={this.props.handleEdit}
              handleIsActive={this.props.handleIsActive}
              handleDeleteItem={this.props.handleDeleteItem} 
              selectItem={this.props.selectItem}/>
          )}
        </ul>
        <Page 
              handlePageClick={this.handlePageClick}
              totalPages={totalPages}
              currentPage={this.state.currentPage}/>
      </main>
    );
  }


}

export default Content;