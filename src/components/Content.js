import React from 'react';
import { FILTER, completed } from '../App';
import Footer from './Footer1';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filter: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      this.setState({ list: this.props.list });
    }
    if (prevProps.filter !== this.props.filter) {
      this.setState({ filter: this.props.filter });
    }
  }

  render() {
    const { list, filter } = this.state;
    // console.log(filter);
    let filteredList = list;
    if (filter === FILTER.ACTIVE) {
      filteredList = list.filter(item => !item.completed);
    } else if (filter === FILTER.COMPLETED) {
      filteredList = list.filter(item => item.completed);
    }
    return (
      <main>
        {this.state.list.length > 0 && (
          <input type="checkbox" className="select-all" onChange={this.props.handleToggleAll}></input>
        )}
        <ul id="todo-list">
          {filteredList.map((item) =>
            <li key={item.itemId} className={item.completed ? 'completed todo-item' : 'todo-item'} onDoubleClick={() => this.props.handleDoubleClick(item.itemId)}>
              <div className="view row">

                {item.editing ? (
                  <input type="text" className='input-text' value={item.newContent} onChange={(e) => this.props.handleOnChange(item.itemId, e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { this.props.handleEdit(item.itemId); } }}
                    onBlur={() => { this.props.handleEdit(item.itemId); }}
                  />
                ) : (
                  <>
                    <input type="checkbox" checked={item.completed} onChange={() => this.props.handleIsActive(item.itemId)} className="select-item col" />
                    <label htmlFor="item" className="item col-10">{item.content}</label>
                    <button className="col delete-item">
                      <i className="fa fa-times" aria-hidden="true" onClick={() => this.props.handleDeleteItem(item.itemId)}></i>
                    </button>
                  </>
                )}

              </div>
            </li>
          )}
        </ul>
      </main>
    );
  }


}

export default Content;