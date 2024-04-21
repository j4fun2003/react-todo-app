import React from 'react';
import {  produce } from 'immer';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId : null
    }
    this.inputRef = React.createRef();
  }


  updateState = (itemId,content) => {
    this.setState(prevState => 
        produce(prevState, newState =>  {
          newState.itemId = itemId;
        }));
    this.inputRef.current.value=content;

   this.inputRef.current.focus();
  }

  handleOnkey = (event) => {
    console.log(this.inputRef.current.value);
    if (event.key === "Enter") {
      if(this.state.itemId){
        this.props.updateItem(this.inputRef.current.value);
      }else{
        this.props.addItem(this.inputRef.current.value);
      }
      this.inputRef.current.value='';
      this.setState({ itemId : null});
    }
  };

  render() {
    const {theme} = this.context;
    return (
      <header>
        <h1 class="title">todos</h1>
        <div class="input-area">
          <input type="text"  style={{ backgroundColor: theme.background,color: theme.foreground}} ref={this.inputRef} className="input-text" placeholder="What needs to be done?"  onKeyDown={this.handleOnkey}></input>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  inputRef :  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
}

Header.contextType = ThemeContext;

export default Header;