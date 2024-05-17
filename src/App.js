import React, { useRef, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import PropTypes from 'prop-types';
import Header from './components/Header1';
import Content from './components/Content';
import Footer from './components/Footer1';
import Toolbar from './components/Toolbar';
import {
  addItem,
  toggleItemStatus,
  deleteItem,
  deleteCompleted,
  toggleAll,
  selectItem,
  updateItem,
  setLoading,
  setFilter,
  FILTER
} from './components/redux/actions';
const ModalLoading = lazy(() => import('./components/Loading'));


const App = () => {
  const { list, filter, loading, selectedItem } = useSelector(state => state);
  const dispatch = useDispatch();
  const headerRef = useRef();

  const handleAddItem = (value) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(addItem(value));
      dispatch(setLoading(false));
    }, 500);
  };

  return (
    <div className="todo">
      <Suspense fallback={loading}>
        <Toolbar />
        <Header
          ref={headerRef}
          addItem={handleAddItem}
          updateItem={(value) => dispatch(updateItem(selectedItem.itemId, value))}
        />
        <Content
          loading={loading}
          list={list[filter]}
          handleStatus={(itemId) => dispatch(toggleItemStatus(itemId))}
          handleDeleteItem={(itemId) => dispatch(deleteItem(itemId))}
          handleToggleAll={() => dispatch(toggleAll())}
          selectItem={(itemId) => {
            dispatch(selectItem(itemId));
            const item = list[FILTER.ALL].find(item => item.itemId === itemId);
            headerRef.current.updateState(itemId, item.content);
          }}
          updateLoading={(value) => dispatch(setLoading(value))}
        />
        <Footer
          filter={filter}
          list={list}
          filterList={(selectedFilter) => dispatch(setFilter(selectedFilter))}
          handleDeleteCompleted={() => dispatch(deleteCompleted())}
        />
        {loading && <ModalLoading />}
      </Suspense>
    </div>
  );
};

// const App = () => {
// const [list, setList] = useState({
//   [FILTER.ALL]: [
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
//   ],
//   [FILTER.ACTIVE]: [
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
//   ],
//   [FILTER.COMPLETED]: []
// });
// const [filter, setFilter] = useState(FILTER.ALL);
// const [loading, setLoading] = useState(false);
// const headerRef = useRef();

// const addItemToList = (value) => {
//   setLoading(true);
//   setTimeout(() => {
//     setList((prevState) =>
//       produce(prevState, (newState) => {
//         const newItem = { content: value, completed: false, itemId: prevState[FILTER.ALL].length };
//         newState[FILTER.ALL].push(newItem);
//         newState[FILTER.ACTIVE].push(newItem);
//       })
//     );
//     setLoading(false);
//   }, 500);
// };


// const handleStatus = (itemId) => {
//   setList((prevState) =>
//     produce(prevState, (newState) => {
//       const itemIndex = newState[FILTER.ALL].findIndex(item => item.itemId === itemId);
//       const item = newState[FILTER.ALL][itemIndex];
//       item.completed = !item.completed;
//       if (item.completed) {
//         newState[FILTER.COMPLETED].push(item);
//         newState[FILTER.ACTIVE] = newState[FILTER.ACTIVE].filter(item => item.itemId !== itemId);
//       } else {
//         newState[FILTER.ACTIVE].push(item);
//         newState[FILTER.COMPLETED] = newState[FILTER.COMPLETED].filter(item => item.itemId !== itemId);
//       }
//     })
//   );
// };

// const handleDeleteItem = (itemId) => {
//   setList((prevState) =>
//     produce(prevState, (newState) => {
//       const filteredList = prevState[FILTER.ALL].filter(item => item.itemId !== itemId);
//       newState[FILTER.ALL] = filteredList;
//       newState[FILTER.ACTIVE] = newState[FILTER.ACTIVE].filter(item => item.itemId !== itemId);
//       newState[FILTER.COMPLETED] = newState[FILTER.COMPLETED].filter(item => item.itemId !== itemId);
//     })
//   );
// };


// const handleDeleteCompleted = () => {
//   setList((prevState) =>
//     produce(prevState, (newState) => {
//       newState[FILTER.ALL] = newState[FILTER.ALL].filter(item => !item.completed);
//       newState[FILTER.COMPLETED] = [];
//     })
//   );
// };

// const handleToggleAll = () => {
//   setList((prevState) =>
//     produce(prevState, (newState) => {
//       const checkCompleted = newState[FILTER.ALL].every(item => item.completed);
//       newState[FILTER.ALL].forEach(item => {
//         item.completed = !checkCompleted;
//       });
//       if (checkCompleted) {
//         newState[FILTER.COMPLETED] = [];
//         newState[FILTER.ACTIVE] = newState[FILTER.ALL];
//       } else {
//         newState[FILTER.COMPLETED] = newState[FILTER.ALL];
//         newState[FILTER.ACTIVE] = [];
//       }
//     })
//   );
// };

// const selectItem = (itemId) => {
//   const item = list[FILTER.ALL].find(item => item.itemId === itemId);
//   const content = item.content;
//   headerRef.current.updateState(itemId, content);
// };

// const updateItem = (updatedValue) => {
//   setList((prevState) =>
//     produce(prevState, (newState) => {
//       const itemIndex = newState[FILTER.ALL].findIndex(item => item.itemId === headerRef.current.getItemId());
//       const item = newState[FILTER.ALL][itemIndex];
//       if (item) {
//         item.content = updatedValue;
//         const indexOfActive = newState[FILTER.ACTIVE].findIndex(item => item.itemId === headerRef.current.getItemId());
//         const indexOfCompleted = newState[FILTER.COMPLETED].findIndex(item => item.itemId === headerRef.current.getItemId());
//         if (indexOfActive !== -1) {
//           newState[FILTER.ACTIVE][indexOfActive].content = updatedValue;
//         }
//         if (indexOfCompleted
//           !== -1) {
//           newState[FILTER.COMPLETED][indexOfCompleted].content = updatedValue;
//         }
//       }
//     })
//   );
// };

// const updateLoading = (value) => {
//   setLoading(value);
// }

// const filterList = (selectedFilter) => {
//   setFilter(selectedFilter);
// };

//   return (
//     <div className="todo">
//       <Suspense fallback={loading}>
//         <Toolbar/>
//         <Header
//           ref={headerRef}
//           addItem={addItemToList}

//           updateItem={updateItem} />
//         <Content
//           loading={loading}
//           list={list[filter]}
//           handleStatus={handleStatus}
//           handleDeleteItem={handleDeleteItem}
//           handleToggleAll={handleToggleAll}
//           selectItem={selectItem}
//           updateLoading={updateLoading}
//         />
//         <Footer
//           filter={filter}
//           list={list}
//           filterList={filterList}
//           handleDeleteCompleted={handleDeleteCompleted}
//         />
//         {loading && <ModalLoading />}
//       </Suspense>
//     </div>
//   );
// };

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