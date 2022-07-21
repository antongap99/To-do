
import storage from './storageService.js';
const {setStorage, removeStorage, getStorage,} = storage;

import create from './create.js';
const {createModal, addNewTask,} = create;
import calc from './calc.js';
const { getRandomIntInclusive, idGenerate,} = calc;



const renderApp = (selectorApp) => {
    const appContainer = document.querySelector(selectorApp);
    const {modalForm, overlay,} = createModal();


    appContainer.append(overlay);

    return {
      modalForm,
      overlay,
    }
}




const renderUserTasks = (key, tBody) => {
  const data = getStorage(key);
  data.forEach((elem) => {
  addNewTask( elem.taskInputValue, elem.status, elem.id, tBody);
  })
}


export default {
    renderApp,
    renderUserTasks,
}