
import React from 'react';
import Header from './components/Header1';
import Content from './components/Content';
import Footer from './components/Footer1';

export const FILTER = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};


let index = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filter: ''
    };
  }

  addItemToList = (value) => {
    const newItem = { content: value, completed: false, itemId: index++ };
    this.setState((prevState) => ({
      list: [newItem, ...prevState.list],
    }));
  };

  handleIsActive = (itemId) => {
    this.setState(prevState => ({
      list: prevState.list.map(item => {
        if (item.itemId === itemId) {
          const updatedItem = { ...item, completed: !item.completed };
          return updatedItem;
        } else {
          return item;
        }
      })
    }));
  };


 

  handleDeleteItem = (itemId) => {
    const {list} = this.state.filter(item => item.itemId != itemId);
    this.setState({ list });
  };

  handleDeleteCompleted = () => {
    const {list} = this.state.filter(item => !item.completed);
    this.setState({ list });
  };

  filterList = (filter) => {
    this.setState({ filter });
  };

  handleToggleAll = () => {
    const allCompleted = this.state.list.every(item => item.completed);
    this.setState(prevState => ({
      list: prevState.list.map(item => ({
        ...item,
        completed: !allCompleted
      }))
    }));
  };
  
  handleEdit = (itemId) => {
    this.setState(prevState => ({
      list: prevState.list.map(item => {
        if (item.itemId === itemId) {
          return { ...item, content: item.newContent};
        }
        return item;
      })
    }));
    // this.setState({isEditing:false});
  };

  handleOnChange = (itemId, newContent) => {
    this.setState(prevState => ({
      list: prevState.list.map(i => {
        if (i.itemId === itemId) {
          return { ...i, newContent: newContent };
        }
        return i;
      })
    }));
  };


  render() {
    return (
      <div className="todo">
        <Header addItem={this.addItemToList} />
        <Content
          list={this.state.list}
          filter={this.state.filter}
          handleIsActive={this.handleIsActive}
          // handleDoubleClick={this.handleDoubleClick}
          handleOnChange={this.handleOnChange}
          handleEdit={this.handleEdit}
          handleDeleteItem={this.handleDeleteItem}
          handleToggleAll={this.handleToggleAll}
        />
        <Footer
          list={this.state.list}
          filterList={this.filterList}
          handleDeleteCompleted={this.handleDeleteCompleted}
        />
      </div>
    );
  }
}

export default App;
