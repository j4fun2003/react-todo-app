import { ref, set, update, remove, get } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app } from '../database/firebase';

const db = getDatabase(app);

export const addItemToDatabase = async (item) => {
  const itemRef = ref(db, '/items/' + item.itemId);
  await set(itemRef, item);
};

export const toggleItemStatusInDatabase = async (key) => {
  const itemRef = ref(db, '/items/' + key);
  const snapshot = await get(itemRef);
  const item = snapshot.val();

  const updatedItem = {
    ...item,
    completed: !item.completed,
  };
  await update(itemRef, updatedItem);
  return updatedItem;
};

export const deleteItemFromDatabase = async (key) => {
  const itemRef = ref(db, '/items/' + key);
  await remove(itemRef);
};

export const deleteCompletedInDatabase = async () => {
  const itemRef = ref(db, '/items' );
  const items = (await get(itemRef)).val();
  debugger
  const completedItem = items.filter(item => item.completed);
  completedItem.forEach(item => {
    remove(ref(db, '/items/' + item.itemId));
  })
}

export const updateItemInDatabase = async (key, content) => {
  debugger
  const itemRef = ref(db, '/items/' + key.itemId);
  const item = (await get(itemRef)).val();
  const updatedItem = {
    ...item,
    content: content,
  };
  await update(itemRef, updatedItem);
  return updatedItem;
};

export const fetchDataInDatabase = async () => {
  const snapshot = await get(ref(db, `items`));
  const data = snapshot.val();
  return data;
};

