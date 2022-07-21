
import control from './modules/control.js';
const {
  modalControl,
  taskControl,
  dltControl,
  successControl,
} = control;

import render from './modules/render.js';
const {renderApp,} = render;




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

