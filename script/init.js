import storage from './modules/storageService.js';
const {setStorage, removeStorage, getStorage,} = storage;
import control from './modules/control.js';
const {modalControl,
  taskControl,
  dltControl,
  NumberingControl,
  successControl,} = control;

import render from './modules/render.js';
const {renderApp, renderUserTasks, } = render;

import create from './modules/create.js';
const {createModal, addNewTask,} = create;
import calc from './modules/calc.js';
const { getRandomIntInclusive, idGenerate,} = calc;





const  init = () => {
  const tBody = document.querySelector('tBody');
  const form = document.querySelector('form');
    const {
      modalForm,
      overlay,
    } = renderApp('.app-container.vh-100');

    modalControl(modalForm, overlay, form, tBody);
    dltControl(tBody);
    taskControl(form, tBody);
    successControl(tBody);
};










document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    init();
});