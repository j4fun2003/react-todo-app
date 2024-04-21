import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/loading.css';

class ModalLoading extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-loading">
        <div className="modal-loading-content">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
      </div>,
      this.el 
    );
  }
}

export default ModalLoading;
