import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';

export const limit = 5;
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    this.contentRef.current.addEventListener('scroll', this.handleScrollToEnd);
  }

  componentWillUnmount() {
    this.contentRef.current.removeEventListener('scroll', this.handleScrollToEnd);
  }

  handleScrollToEnd = () => {
    const { list } = this.props;
    const { page } = this.state;
    const lastItem = page * limit;
    const { scrollTop, scrollHeight, clientHeight } = this.contentRef.current;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      lastItem < list.length
    ) {
      setTimeout(() => {
        this.setState(prevState => ({
          page: prevState.page + 1,
        }));
      }, 3000);
    }
  }


  render() {
    console.log("default props", this.props.list);
    const { list } = this.props;
    const { page } = this.state;
    const startIndex = (page - 1) * limit;
    const itemsToShow = list.slice(0, startIndex + limit);
    return (
      <ThemeContext.Consumer>
        {theme => (
          <main ref={this.contentRef} style={{ backgroundColor: theme.background, color: theme.foreground, overflowY: 'scroll', height: '200px' }}>
            {this.props.list.length > 0 && (
              <input type="checkbox" className="select-all" onChange={this.props.handleToggleAll}></input>
            )}
            <ul id="todo-list">
              {itemsToShow.map((item) =>
                <TodoItem
                  theme={this.theme}
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
        )}
      </ThemeContext.Consumer>
    );
  }


}

Content.propTypes = {
  filteredList: PropTypes.array,
  list: PropTypes.array,
}

export default Content;