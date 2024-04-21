import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import ScrollFunction from './HOC/ScrollHOC';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {theme} = this.context;
    const {list, limit, page, handleToggleAll} = this.props;
    const startIndex = (page - 1) * limit;
    const itemsToShow = list.slice(0, startIndex + limit);
    return (
          <main style={{ backgroundColor: theme.background, color: theme.foreground}}>
            {list.length > 0 && (
              <input type="checkbox" className="select-all" onChange={handleToggleAll}></input>
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
            {}


          </main>
    );
  }


}

Content.propTypes = {
  filteredList: PropTypes.array,
  list: PropTypes.array,
}

Content.contextType = ThemeContext;

export default ScrollFunction(Content);