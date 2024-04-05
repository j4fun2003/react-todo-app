
import React from 'react';
import Header from './components/Header1';
import Content from './components/Content';
import Footer from './components/Footer1';
import { produce } from 'immer';
import PropTypes from 'prop-types';

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
      list: {
        [FILTER.ALL]: [
          { content: '0', completed: false, itemId: index++ },
          { content: '1', completed: false, itemId: index++ },
          { content: '2', completed: false, itemId: index++ },
          { content: '3', completed: false, itemId: index++ },
          { content: '4', completed: false, itemId: index++ },
          { content: '5', completed: false, itemId: index++ },
          { content: '6', completed: false, itemId: index++ },
          { content: '7', completed: false, itemId: index++ },
          { content: '8', completed: false, itemId: index++ },
          { content: '9', completed: false, itemId: index++ },
          { content: '10', completed: false, itemId: index++ },
          { content: '11', completed: false, itemId: index++ },
          { content: '12', completed: false, itemId: index++ },
          { content: '13', completed: false, itemId: index++ },
          { content: '14', completed: false, itemId: index++ },
          { content: '15', completed: false, itemId: index++ }
        ],
        [FILTER.ACTIVE]: [
          { content: '0', completed: false, itemId: index++ },
          { content: '1', completed: false, itemId: index++ },
          { content: '2', completed: false, itemId: index++ },
          { content: '3', completed: false, itemId: index++ },
          { content: '4', completed: false, itemId: index++ },
          { content: '5', completed: false, itemId: index++ },
          { content: '6', completed: false, itemId: index++ },
          { content: '7', completed: false, itemId: index++ },
          { content: '8', completed: false, itemId: index++ },
          { content: '9', completed: false, itemId: index++ },
          { content: '10', completed: false, itemId: index++ },
          { content: '11', completed: false, itemId: index++ },
          { content: '12', completed: false, itemId: index++ },
          { content: '13', completed: false, itemId: index++ },
          { content: '14', completed: false, itemId: index++ },
          { content: '15', completed: false, itemId: index++ }
        ],
        [FILTER.COMPLETED]: [

        ],
      },
      filter: FILTER.ALL,
    };
    this.headerRef = React.createRef();
    this.contentRef= React.createRef();
  }

  addItemToList = (value) => {
    this.setState((prevState) =>
      produce(prevState, newState => {
        const newItem = { content: value, completed: false, itemId: index++ };
        newState.list[FILTER.ALL].push(newItem);
        newState.list[FILTER.ACTIVE].push(newItem);
      }));
  };


  handleStatus = (itemId) => {
    this.setState(prevState =>
      produce(prevState, newState => {
        console.log('item id', itemId);
        const itemIndex = newState.list[FILTER.ALL].findIndex(item => item.itemId === itemId);
        const itemIndexActive = newState.list[FILTER.ACTIVE].findIndex(item => item.itemId === itemId);
        const itemCompletedActive = newState.list[FILTER.COMPLETED].findIndex(item => item.itemId === itemId);
        const item = newState.list[FILTER.ALL][itemIndex];
        item.completed = !item.completed;
        if (item.completed) {
          newState.list[FILTER.COMPLETED].push(item);
          if (itemIndexActive !== -1) {
            newState.list[FILTER.ACTIVE].splice(itemIndexActive, 1);
          }
        } else {
          newState.list[FILTER.ACTIVE].push(item);
          if (itemCompletedActive !== -1) {
            newState.list[FILTER.COMPLETED].splice(itemCompletedActive, 1);
          }
        }
      })
    );
  };

  handleDeleteItem = (itemId) => {
    this.setState(prevState =>
      produce(prevState, newState => {
        const itemIndexAll = newState.list[FILTER.ALL].findIndex(item => item.itemId === itemId);
        if (itemIndexAll !== -1) {
          newState.list[FILTER.ALL].splice(itemIndexAll, 1);
          const itemIndexActive = newState.list[FILTER.ACTIVE].findIndex(item => item.itemId === itemId);
          const itemIndexCompleted = newState.list[FILTER.COMPLETED].findIndex(item => item.itemId === itemId);
          if (itemIndexActive !== -1) {
            newState.list[FILTER.ACTIVE].splice(itemIndexActive, 1);
          }
          if (itemIndexCompleted !== -1) {
            newState.list[FILTER.COMPLETED].splice(itemIndexCompleted, 1);
          }
        }
      })
    );
  };


  handleDeleteCompleted = () => {
    this.setState(prevState =>
      produce(prevState, newState => {
        newState.list[FILTER.ALL] = newState.list[FILTER.ALL].filter(item => !item.completed);
        newState.list[FILTER.COMPLETED] = [];
      })
    );
  };


  filterList = (filter) => {
      this.setState({ filter });
  };

  handleToggleAll = () => {
    this.setState(prevState =>
      produce(prevState, newState => {
        const checkCompleted = newState.list[FILTER.ALL].every(item => item.completed);
        if (checkCompleted) {
          newState.list[FILTER.ALL].forEach(item => {
            item.completed = false;
          });
          newState.list[FILTER.COMPLETED] = [];
          newState.list[FILTER.ACTIVE] = newState.list[FILTER.ALL];
        } else {
          newState.list[FILTER.ALL].forEach(item => {
            item.completed = true;
          });
          newState.list[FILTER.COMPLETED] = newState.list[FILTER.ALL];
          newState.list[FILTER.ACTIVE] = [];
        }
      })
    );
  };

  selectItem = (itemId) => {
    const item = this.state.list[FILTER.ALL].find(item => item.itemId === itemId);
    const content = item.content;
    this.headerRef.current.updateState(itemId, content);
  }

  updateItem = (updatedValue) => {
    this.setState(prevState =>
      produce(prevState, newState => {
        const item = newState.list[FILTER.ALL].find(item => item.itemId === this.headerRef.current.state.itemId);
        const indexOfActive = newState.list[FILTER.ACTIVE].findIndex(item => item.itemId === this.headerRef.current.state.itemId);
        const indexOfCompleted = newState.list[FILTER.COMPLETED].findIndex(item => item.itemId === this.headerRef.current.state.itemId);
        if (item) {
          item.content = updatedValue;
          if (indexOfActive !== -1) {
            newState.list[FILTER.ACTIVE][indexOfActive].content = updatedValue;
          } 
          if(indexOfCompleted !== -1){
            newState.list[FILTER.COMPLETED][indexOfCompleted].content = updatedValue;
          }
        }
      })
    );
  }

  render() {
    return (
      <div className="todo">
        <Header
          ref={this.headerRef}
          addItem={this.addItemToList}
          updateItem={this.updateItem} />
        <Content
          ref={this.contentRef}
          list={this.state.list[this.state.filter]}
          handleStatus={this.handleStatus}
          handleDeleteItem={this.handleDeleteItem}
          handleToggleAll={this.handleToggleAll}
          selectItem={this.selectItem}
        />
        <Footer
          filter={this.state.filter}
          list={this.state.list}
          filterList={this.filterList}
          handleDeleteCompleted={this.handleDeleteCompleted}
        />
      </div>
    );
  }
}

App.propTypes = { 
  list : PropTypes.array,
  filter : PropTypes.string,
  addItemToList : PropTypes.func,
  updateItem : PropTypes.func,
  handleStatus : PropTypes.func,
  handleDeleteItem : PropTypes.func,
  handleToggleAll : PropTypes.func,
  selectItem : PropTypes.func,
  handleDeleteCompleted : PropTypes.func,
  filterList : PropTypes.func
}

// Content.defaultProps = { 
//   list : [
//     { content: '0', completed: false, itemId: index++ },
//     { content: '1', completed: false, itemId: index++ },
//     { content: '2', completed: false, itemId: index++ },
//     { content: '3', completed: false, itemId: index++ },
//     { content: '4', completed: false, itemId: index++ },
//     { content: '5', completed: false, itemId: index++ },
//     { content: '6', completed: false, itemId: index++ },
//     { content: '7', completed: false, itemId: index++ },
//     { content: '8', completed: false, itemId: index++ },
//     { content: '9', completed: false, itemId: index++ },
//     { content: '10', completed: false, itemId: index++ },
//     { content: '11', completed: false, itemId: index++ },
//     { content: '12', completed: false, itemId: index++ },
//     { content: '13', completed: false, itemId: index++ },
//     { content: '14', completed: false, itemId: index++ },
//     { content: '15', completed: false, itemId: index++ }
//   ]
// }

export default App;
