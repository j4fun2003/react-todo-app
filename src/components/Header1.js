import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleOnkey = (event) => {
    if (event.key === "Enter") {
      const value = this.state.value;
      this.props.addItem(value);
      this.setState({ value: '' });
    }
  };

  handleOnChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  render() {
    return (
      <header>
        <h1 class="title">todos</h1>
        <div class="input-area">
          <input type="text" value={this.state.value} className="input-text" placeholder="What needs to be done?" onChange={this.handleOnChange} onKeyDown={this.handleOnkey}></input>
        </div>
      </header>
    );
  }
}

export default Header;