import React, { useRef, Suspense, lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header1';
import Content from './components/Content';
import Footer from './components/Footer1';
import Toolbar from './components/Toolbar';

import {fetchData} from './components/redux/actions'
import { getDatabase, ref ,get , onValue} from "firebase/database";
import {app} from './components/database/firebase'
const ModalLoading = lazy(() => import('./components/Loading'));


const App = () => {
  const {items , filter, loading } = useSelector(state => state);
  const headerRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const db = getDatabase(app);
        const itemsRef = get(ref(db, 'items'));
        onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();
          dispatch(fetchData(data));
        });
      } catch (error) {
        console.error('Error fetching data from Firebase: ', error);
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <div className="todo">
      <Suspense fallback={loading}>
        <Toolbar />
        <Header
          ref={headerRef}
        />
        <Content
          loading={loading}
        />
        <Footer
          filter={filter}
          list={items}
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