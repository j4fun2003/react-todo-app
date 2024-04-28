import React, { useState, useRef, useContext, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';

const Header = forwardRef(({ addItem, updateItem }, ref) => {
  const { theme } = useContext(ThemeContext);
  const [itemId, setItemId] = useState(null);
  const inputRef = useRef();

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

  const handleOnkey = (event) => {
    if (event.key === 'Enter') {
      if (itemId) {
        updateItem(inputRef.current.value);
      } else {
        addItem(inputRef.current.value);
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
          onKeyDown={handleOnkey}
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
