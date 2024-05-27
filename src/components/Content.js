import React, { useContext } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import useScroll from './hook/useScroll';
import {
  toggleAll,
} from '../components/redux/actions';

const Content = () => {
  const { items } = useSelector(state => state);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { refOfElement, page, limit } = useScroll(items);
  const startIndex = (page - 1) * limit;
  console.log("start", startIndex);
  const itemsToShow = items.slice(0, startIndex + limit);
  console.log("item", itemsToShow);

  const handleToggleAll = () => {
    dispatch(toggleAll());
  }


  return (
    <main style={{ backgroundColor: theme.background, color: theme.foreground }}>
      {items.length > 0 && (
        <input type="checkbox" className="select-all" onChange={handleToggleAll}></input>
      )}
      <div ref={refOfElement} style={{ overflowY: 'scroll', height: '200px' }}>
        <ul id="todo-list" >
          {itemsToShow.map((item) =>
            <TodoItem
              theme={theme}
              item={item}
              key={item.itemId}
            />
          )}
        </ul>
      </div>
    </main>
  );
};

Content.propTypes = {
  items: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
  handleStatus: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  updateLoading: PropTypes.func.isRequired
};

export default Content;
