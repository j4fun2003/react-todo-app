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

  handlePageClick = (pageNumber) => {
    this.setState({ currentPage: pageNumber});
  };

  filterList = (list, filter) => {
    if (filter === FILTER.ACTIVE) { 
      return list.filter(item => !item.completed);
    } else if (filter === FILTER.COMPLETED) {
      return list.filter(item => item.completed);
    }
    return list;
  };

  paginateList = (list, currentPage, pageSize) => {
    const firstItem = (currentPage - 1) * pageSize;
    const lastItem = currentPage * pageSize;
    return list.slice(firstItem, lastItem);
  };

  render() {
    const totalPages = Math.ceil(this.props.list.length / PAGE_SIZE);
    const { filter } = this.props;
    let filteredList = this.filterList(this.props.list, filter);
    const displayedList = this.paginateList(filteredList, this.state.currentPage, PAGE_SIZE);
    console.log("currentPage",this.state.currentPage);
    console.log('list',this.props.list);
    console.log("displayList", displayedList)

    return (
      <main>
        {this.props.list.length > 0 && (
          <input type="checkbox" className="select-all" onChange={this.props.handleToggleAll}></input>
        )}
        <ul id="todo-list">
          {displayedList.map((item) =>
            <TodoItem
              list={this.props.list}
              item={item}
              key={item.itemId}
              handleOnChange={this.props.handleOnChange}
              handleEdit={this.props.handleEdit}
              handleStatus={this.props.handleStatus}
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