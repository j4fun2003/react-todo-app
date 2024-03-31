import React from 'react';

import { FILTER } from '../App';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: FILTER.ALL
    };
  }

  handleOnClick = (event) => {
    this.handleSelect(event.target.name);
  }


  handleSelect = (filter) => {
    this.setState({ selected: filter });
    this.props.filterList(filter);
  };

  render() {
    return (
      <footer id="nav" className="row">
        <span className="todo-count col">{this.props.list.length} item left</span>
        <ul className="filters col-5">
          <li className={this.state.selected === FILTER.ALL ? 'selected' : ''}>
            <a href="#/" name={FILTER.ALL} onClick={this.handleOnClick}>All</a>
          </li>
          <li className={this.state.selected === FILTER.ACTIVE ? 'selected' : ''}>
            <a href="#/active" name={FILTER.ACTIVE} onClick={this.handleOnClick}>Active</a>
          </li>
          <li className={this.state.selected === FILTER.COMPLETED ? 'selected' : ''}>
            <a href="#/completed" name={FILTER.COMPLETED} onClick={this.handleOnClick} >Completed</a>
          </li>
        </ul>
        <button className="clear-completed col" onClick={() => this.props.handleDeleteCompleted()}>Clear completed</button>
      </footer>
    );
  }
}

export default Footer;
