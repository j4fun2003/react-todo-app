import React, { useState, useRef, useContext, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import { useDispatch } from 'react-redux';
import {
  addItem,
  updateItem,
} from '../components/redux/actions';

const Header = forwardRef((props, ref) => {
  const { theme } = useContext(ThemeContext);
  const [itemId, setItemId] = useState(null);
  const inputRef = useRef();
  const dispatch = useDispatch();



  useImperativeHandle(ref, () => ({
    updateState(itemId, content) {
      setItemId(itemId);
      console.log(itemId);
      inputRef.current.value = content;
      inputRef.current.focus();
    },
    getItemId() {
      return itemId;
    }
  }));

  const handleOnKey = (event) => {
    if (event.key === 'Enter') {
      if (itemId) {
        dispatch(updateItem({ itemId, content: inputRef.current.value }));
      } else {
        dispatch(addItem(inputRef.current.value));
      }
      inputRef.current.value = '';
      setItemId(null);
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
        />
      </div>
    </header>
  );
});


Header.propTypes = {
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired
};

export default Header;
