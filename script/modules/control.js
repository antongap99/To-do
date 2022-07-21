import storage from './storageService.js';
const {setStorage, removeStorage, getStorage,} = storage;

import render from './render.js';
const {renderApp, renderUserTasks, } = render;

import create from './create.js';
const {createModal, addNewTask, createNameTag,} = create;
import calc from './calc.js';
const { getRandomIntInclusive, idGenerate,} = calc;

const modalControl  = (modalForm, overlay, form, tBody) => {

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      overlay.classList.remove('is-visible');

      let user = formData.get('username');

      const {userName, userNameTag} = createNameTag(user);

      form.before(userNameTag);

      const storageKeys = [];
      for(let i = 0; i < localStorage.length; i++) {
        storageKeys.push(localStorage.key(i));
      }
      if(!storageKeys.includes(userName)){
        localStorage.setItem(userName, JSON.stringify([]));
      }


      localStorage.setItem('user', userName);
      renderUserTasks(userName, tBody);
    } );

  }

  const taskControl = (form, tBody) => {

    const taskInput = form.querySelector('.form-control');
    const btnSave = form.querySelector('.btn-primary');
    btnSave.setAttribute('disabled', '');
    form.addEventListener('change', (e) => {
      if(taskInput.value) {
        btnSave.removeAttribute('disabled');
      } else {
        btnSave.setAttribute('disabled', '');
      };
    })


    form.addEventListener('submit', (e) => {
      const key = localStorage.getItem('user');
      e.preventDefault();
      if(taskInput.value ) {
        const {taskInputValue, status, id} = addNewTask( taskInput.value, 'В процессе', idGenerate(), tBody);
        setStorage(key, {taskInputValue, status, id,});
        btnSave.setAttribute('disabled', '');
        form.reset();
      };
    }  );



    form.addEventListener('reset', (e) => {
      btnSave.setAttribute('disabled', '');
    })

  };

  const dltControl = (tBody) => {

    const deleteBtn = document.querySelector('.btn-danger');
    tBody.addEventListener('click', (e) => {
      const key = localStorage.getItem('user');

      if(e.target.closest('.btn-danger') && confirm('хотите удалить задачу?')){
        try{
          e.target.closest('.table-light').remove();
        } catch{
          e.target.closest('.table-success').remove();
        }
      }
      removeStorage(key, e.target.dataset.id);
      NumberingControl(tBody)
    })
  }

  const NumberingControl = (tBody) => {
    const numbering = tBody.children;
    for (let i = 1; i <= tBody.children.length; i++ ){
        numbering[i - 1].firstElementChild.textContent = i;
    }
  }


  const successControl = (tBody) => {
    tBody.addEventListener('click', (e) => {
      if(e.target.closest('.btn-success')){
        try{
          const tr = e.target.closest('.table-light');
          tr.className ='table-success';
          tr.children[1].className = 'text-decoration-line-through';
          tr.children[2].textContent = 'Выполнена';
        } catch{
          const tr = e.target.closest('.table-success');
          tr.className ='table-light';
          tr.children[1].className = 'task';
          tr.children[2].textContent = 'В процессе';
        }


      }
    });
  }


  export default {
    modalControl,
    taskControl,
    dltControl,
    NumberingControl,
    successControl,
  }