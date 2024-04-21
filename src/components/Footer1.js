import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../assets/javascript/theme-context';
import { FILTER } from '../App';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = (event) => {
    this.props.filterList(event.target.name);
  }

  render() {
    const {theme} = this.context;
    const {filter} = this.props;
    return (
      <footer id="nav" className="row"  style={{ backgroundColor: theme.background,color: theme.foreground}} >
        <span className="todo-count col">{this.props.list[filter].length} item left</span>
        <ul className="filters col-5">
          <li className={filter === FILTER.ALL ? 'selected' : ''} >
            <a href="#/" name={FILTER.ALL} onClick={this.handleOnClick} style={{ backgroundColor: theme.background,color: theme.foreground}}>All</a>
          </li>
          <li className={filter === FILTER.ACTIVE ? 'selected' : ''}>
            <a href="#/active" name={FILTER.ACTIVE} onClick={this.handleOnClick} style={{ backgroundColor: theme.background,color: theme.foreground}}>Active</a>
          </li>
          <li className={filter === FILTER.COMPLETED ? 'selected' : ''}>
            <a href="#/completed" name={FILTER.COMPLETED} onClick={this.handleOnClick} style={{ backgroundColor: theme.background,color: theme.foreground}}>Completed</a>
          </li>
        </ul>
        <button className="clear-completed col" onClick={() => this.props.handleDeleteCompleted()} style={{ backgroundColor: theme.background,color: theme.foreground}}>Clear completed</button>
      </footer>
    );
  }
}

Footer.propTypes = { 
  filter : PropTypes.string.isRequired,
  list : PropTypes.array.isRequired
}

Footer.contextType = ThemeContext;
export default Footer;
