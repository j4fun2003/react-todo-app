import React, { useRef, Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header1';
import Content from './components/Content';
import Footer from './components/Footer1';
import Toolbar from './components/Toolbar';

import { fetchData } from './components/redux/actions'
import { getDatabase, ref, get} from "firebase/database";
import { app } from './components/database/firebase'
const ModalLoading = lazy(() => import('./components/Loading'));

const db = getDatabase(app);

const App = () => {
  const [loading, setLoading] = useState(false);
  const headerRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchItems = async () => {
        await get(ref(db, `items`)).then((snapshot) => {
        const data = snapshot.val();
        dispatch(fetchData(data));
      }). catch ((error) => {
        console.error('Error : ', error);
      });
    };
    fetchItems();
  }, [dispatch]);

  return (

    <div className="todo">
      <Suspense fallback={<ModalLoading />}>
        <Toolbar />
        <Header
          ref={headerRef}
        />
        <Content
          loading={loading}
          setLoading={setLoading}
        />
        <Footer
        />
        {loading && <ModalLoading />}
      </Suspense>
    </div>
  );
};

App.propTypes = {
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