import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  updateItem,
} from '../components/redux/actions';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const selectedItem = useSelector(state => state.selectedItem);
  debugger;
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleOnKey = (event) => {
    if (event.key === 'Enter') {
      const inputValue = inputRef.current.value.trim();
      if (inputValue === '') return;
      if (selectedItem) {
        dispatch(updateItem( selectedItem ,  inputRef.current.value ));
      } else {
        dispatch(addItem(inputRef.current.value));
      }
      inputRef.current.value = '';
    }
  };

  return (
    <header>
      <h1 className="title">todos</h1>
      <div className="input-area">
      <input
          type="text"
          style={{ backgroundColor: theme.background, color: theme.foreground }}
          ref={inputRef}
          className="input-text"
          placeholder="What needs to be done?"
          onKeyDown={handleOnKey}
          defaultValue={selectedItem ? selectedItem.content : ''}
        />
      </div>
    </header>
  );
};


Header.propTypes = {
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired
};

export default Header;
