import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnkey = (event) => {
    if (event.key === "Enter") {
      this.props.addItem(event.target.value);
      event.target.value="";
    }
  };

  // handleOnChange = (event) => {
  //   const { value } = event.target;
  //   this.setState({ value });
  // };

  render() {
    return (
      <header>
        <h1 class="title">todos</h1>
        <div class="input-area">
          <input type="text" className="input-text" placeholder="What needs to be done?"  onKeyDown={this.handleOnkey}></input>
        </div>
      </header>
    );
  }
}

export default Header;