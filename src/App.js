import React, { useRef, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header1';
import Content from './components/Content';
import Footer from './components/Footer1';
import Toolbar from './components/Toolbar';
const ModalLoading = lazy(() => import('./components/Loading'));


const App = () => {
  const { list, filter, loading } = useSelector(state => state);
  const headerRef = useRef();

  return (
    <div className="todo">
      <Suspense fallback={loading}>
        <Toolbar />
        <Header
          ref={headerRef}
        />
        <Content
          loading={loading}
          list={list[filter]}
        />
        <Footer
          filter={filter}
          list={list}
        />
        {loading && <ModalLoading />}
      </Suspense>
    </div>
  );
};

App.propTypes = {
  list: PropTypes.object,
  filter: PropTypes.string,
  addItemToList: PropTypes.func,
  updateItem: PropTypes.func,
  handleStatus: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  handleToggleAll: PropTypes.func,
  selectItem: PropTypes.func,
  handleDeleteCompleted: PropTypes.func,
  filterList: PropTypes.func
};

export default App;