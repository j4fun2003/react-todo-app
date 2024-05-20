import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import { useDispatch} from 'react-redux';
import {
  deleteCompleted,
  setFilter,
  FILTER
} from '../components/redux/actions';

const Footer = ({ filter, list }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const handleOnClick = (event) => {
    dispatch(setFilter(event.target.name));
  };

  const handleDeleteCompleted = () => {
      dispatch(deleteCompleted());
    };



  return (
    <footer id="nav" className="row" style={{ backgroundColor: theme.background, color: theme.foreground }}>
      <span className="todo-count col">{list[filter].length} item left</span>
      <ul className="filters col-5">
        <li className={filter === FILTER.ALL ? 'selected' : ''}>
          <a href="#/" name={FILTER.ALL} onClick={handleOnClick} style={{ backgroundColor: theme.background, color: theme.foreground }}>All</a>
        </li>
        <li className={filter === FILTER.ACTIVE ? 'selected' : ''}>
          <a href="#/active" name={FILTER.ACTIVE} onClick={handleOnClick} style={{ backgroundColor: theme.background, color: theme.foreground }}>Active</a>
        </li>
        <li className={filter === FILTER.COMPLETED ? 'selected' : ''}>
          <a href="#/completed" name={FILTER.COMPLETED} onClick={handleOnClick} style={{ backgroundColor: theme.background, color: theme.foreground }}>Completed</a>
        </li>
      </ul>
      <button className="clear-completed col" onClick={handleDeleteCompleted} style={{ backgroundColor: theme.background, color: theme.foreground }}>Clear completed</button>
    </footer>
  );
};

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  filterList: PropTypes.func.isRequired,
  handleDeleteCompleted: PropTypes.func.isRequired
};

export default Footer;
