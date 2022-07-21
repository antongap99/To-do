const getStorage = (key) => {
    let result;
     try {
       result = JSON.parse(localStorage.getItem(key));
     } catch {
       result = localStorage.getItem(key);
     }
    return result || [];
  };

  const setStorage = (key, newTask) => {
    const data = getStorage(key);
    if(!newTask) {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
    data.push(newTask);
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const removeStorage = (key, id) => {
    const data = getStorage(key);

    const newData = data.filter((elem) => +id !== +elem.id);

    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(newData));
  };

  export default {
    setStorage,
    removeStorage,
    getStorage,
  };
