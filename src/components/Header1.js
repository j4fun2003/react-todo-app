import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedItem !== this.props.selectedItem) {
      this.inputRef.current.value = this.props.selectedItem ? this.props.selectedItem.content : '';
    }else {
      this.inputRef.current.value = '';
    }
  }

  // onEdit = (itemId) => {
  //   if(itemId){
  //     this.props.updateItem(this.inputRef.current.value);
  //   }else{
  //     this.props.addItem(this.inputRef.current.value);
  //   }
  // }

  handleOnkey = (event) => {
    console.log(this.inputRef.current.value);
    if (event.key === "Enter") {
      if(this.props.selectedItem){
        // console.log("true");
        // console.log("value ne ",this.inputRef.current.value);
        this.props.updateItem(this.inputRef.current.value);
      }else{
        this.props.addItem(this.inputRef.current.value);
      }
      this.inputRef.current.value='';
    }
  };

  render() {
    return (
      <header>
        <h1 class="title">todos</h1>
        <div class="input-area">
          <input type="text" ref={this.inputRef} className="input-text" placeholder="What needs to be done?"  onKeyDown={this.handleOnkey}></input>
        </div>
      </header>
    );
  }
}

export default Header;