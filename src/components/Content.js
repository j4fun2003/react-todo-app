import React  , {useContext} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import ScrollFunction from './HOC/ScrollHOC';

const Content = ({ list, limit, page, handleToggleAll, handleStatus, handleDeleteItem, selectItem }) => {
  const { theme } = useContext(ThemeContext);
  const startIndex = (page - 1) * limit;
  const itemsToShow = list.slice(0, startIndex + limit);

  return (
    <main style={{ backgroundColor: theme.background, color: theme.foreground }}>
      {list.length > 0 && (
        <input type="checkbox" className="select-all" onChange={handleToggleAll}></input>
      )}
      <ul id="todo-list">
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
};

export default ScrollFunction(Content);