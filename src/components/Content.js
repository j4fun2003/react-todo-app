import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

export const limit = 5;
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollToEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollToEnd);
  }

  handleScrollToEnd = () => {
    const { list } = this.props;
    // console.log("filter", filteredList);
    const { page } = this.state;
    const lastItem = page * limit;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight
      && lastItem < list.length) {
        setTimeout(() => {
          this.setState(prevState => ({
            page: prevState.page + 1,
          }));
        }, 3000);
    }
  }

  render() {
    console.log("default props",this.props.list);
    const { list } = this.props;
    const { page } = this.state;
    const startIndex = (page - 1) * limit;
    const itemsToShow = list.slice(0, startIndex + limit);
    return (
      <main>
        {this.props.list.length > 0 && (
          <input type="checkbox" className="select-all" onChange={this.props.handleToggleAll}></input>
        )}
        <ul id="todo-list">
          {itemsToShow.map((item) =>
            <TodoItem
              item={item}
              key={item.itemId}
              handleStatus={this.props.handleStatus}
              handleDeleteItem={this.props.handleDeleteItem}
              selectItem={this.props.selectItem} />
          )}
        </ul>
        {/* <Page 
              handlePageClick={this.handlePageClick}
            totalPages={totalPages}
              currentPage={this.state.currentPage}/> */}


      </main>
    );
  }


}

Content.propTypes = { 
  filteredList : PropTypes.array,
  list : PropTypes.array,
}

export default Content;