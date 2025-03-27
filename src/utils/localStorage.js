// Save data to localStorage
export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
};

// Get data from localStorage
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return defaultValue;
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

// Remove data from localStorage
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
  }
};

// Clear all data from localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
};

// Update a single item in an array stored in localStorage
export const updateItemInLocalStorage = (key, id, updateFn, idKey = 'id') => {
  try {
    const items = getFromLocalStorage(key, []);
    const updatedItems = items.map(item => 
      item[idKey] === id ? updateFn(item) : item
    );
    saveToLocalStorage(key, updatedItems);
    return updatedItems;
  } catch (error) {
    console.error(`Error updating item in localStorage: ${error}`);
    return null;
  }
};

// Remove a single item from an array stored in localStorage
export const removeItemFromLocalStorage = (key, id, idKey = 'id') => {
  try {
    const items = getFromLocalStorage(key, []);
    const filteredItems = items.filter(item => item[idKey] !== id);
    saveToLocalStorage(key, filteredItems);
    return filteredItems;
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
    return null;
  }
};

// Add a single item to an array stored in localStorage
export const addItemToLocalStorage = (key, item) => {
  try {
    const items = getFromLocalStorage(key, []);
    const updatedItems = [...items, item];
    saveToLocalStorage(key, updatedItems);
    return updatedItems;
  } catch (error) {
    console.error(`Error adding item to localStorage: ${error}`);
    return null;
  }
};