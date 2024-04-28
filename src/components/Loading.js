import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/loading.css';

const ModalLoading = () => {
  const el = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(
    <div className="modal-loading">
      <div className="modal-loading-content">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    </div>,
    el
  );
};

export default ModalLoading;
