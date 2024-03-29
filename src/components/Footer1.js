import React from 'react';

import { FILTER } from '../App';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: FILTER.ALL
    };
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
            <a href="#/" onClick={() => {this.handleSelect(FILTER.ALL); }}>All</a>
          </li>
          <li className={this.state.selected === FILTER.ACTIVE ? 'selected' : ''}>
            <a href="#/active" onClick={() => { this.handleSelect(FILTER.ACTIVE); }}>Active</a>
          </li>
          <li className={this.state.selected === FILTER.COMPLETED ? 'selected' : ''}>
            <a href="#/completed" onClick={() => { this.handleSelect(FILTER.COMPLETED); }}>Completed</a>
          </li>
        </ul>
        <button className="clear-completed col" onClick={() => this.props.handleDeleteCompleted()}>Clear completed</button>
      </footer>
    );
  }
}

export default Footer;
