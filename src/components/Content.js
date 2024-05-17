import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import useScroll from './hook/useScroll';

const Content = ({ list, handleToggleAll, handleStatus, handleDeleteItem, selectItem, updateLoading }) => {
  const { theme } = useContext(ThemeContext);
  const { refOfElement, page, limit } = useScroll(list, updateLoading);
  const startIndex = (page - 1) * limit;
  console.log("start", startIndex);
  const itemsToShow = list.slice(0, startIndex + limit);
  console.log("item", itemsToShow);

  return (
    <main style={{ backgroundColor: theme.background, color: theme.foreground }}>
      {list.length > 0 && (
        <input type="checkbox" className="select-all" onChange={handleToggleAll}></input>
      )}
      <div ref={refOfElement} style={{ overflowY: 'scroll', height: '200px' }}>
        <ul id="todo-list" >
          {itemsToShow.map((item) =>
            <TodoItem
              theme={theme}
              item={item}
              key={item.itemId}
              handleStatus={handleStatus}
              handleDeleteItem={handleDeleteItem}
              selectItem={selectItem}
            />
          )}
        </ul>
      </div>
    </main>
  );
};

Content.propTypes = {
  list: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
  handleStatus: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  updateLoading: PropTypes.func.isRequired
};

export default Content;
