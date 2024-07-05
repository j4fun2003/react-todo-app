import React, { useRef, useContext , useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import { useDispatch, useSelector } from 'react-redux';
import store  from './redux/store';
import {
  addItem,
  updateItem,
} from '../components/redux/actions';
import selectedItemReducer from './reducer/selectReducer';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const selectedItem = useSelector(state => state.selectedItem);
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedItem) {
      setInputValue(selectedItem.content || '');
    } else {
      store.reducerManager.remove('select', selectedItemReducer);
      setInputValue('');
    }
  }, [selectedItem]);

  const handleOnKey = (event) => {
    if (event.key === 'Enter') {
      const inputValue = inputRef.current.value.trim();
      if (inputValue === '') return;
      if (selectedItem) {
        dispatch(updateItem( selectedItem , inputValue ));
      } else {
        dispatch(addItem(inputValue));
      }
      setInputValue('');
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
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
          value={inputValue}
          onChange={handleChange}
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
