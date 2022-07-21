import storage from './modules/storageService.js';
const {setStorage, removeStorage, getStorage,} = storage;

const tBody = document.querySelector('tBody');
const form = document.querySelector('form');
const tasks = [];

const createNameTag = (user) => {
        const userName = user;
        const userNameTag = document.createElement('h2');
        userNameTag.className = 'title__username';
        userNameTag.textContent = `Ваш список дел, ${user}`;

        return{
          userName,
          userNameTag,
        }
}


const createModal = () => {
      const overlay = document.createElement('div');
      overlay.className = 'form-overlay';
      overlay.classList.add('is-visible');
       const modalForm = document.createElement('form');
       modalForm.className = 'form';
       const modalHeader = document.createElement('div');
       modalHeader.className = 'modal-header'
       const helloTag = document.createElement('h2');
       helloTag.className = 'modal-title';
       helloTag.textContent = 'Привет, введите ваше имя для авторизации!';

      const modalMain = document.createElement('label');
      modalMain.className = 'modal__main'
      const inputTag = document.createElement('input');
      inputTag.type = 'text';
      inputTag.className = 'modal__name';
      inputTag.name = 'username';

      const modalFooter = document.createElement('div');
      modalFooter.className = 'modal__footer';
      const modalBtn = document.createElement('button');
      modalBtn.type = 'submit';
      modalBtn.className = 'modal__btn';
      modalBtn.style.backgroundColor = '#499ab8';
      modalBtn.style.color = 'white';
      modalBtn.style.fontSize = '18px';
      modalBtn.style.border = 'none';
      modalBtn.style.borderRadius = '3px';
      modalBtn.name = 'submit';
      modalBtn.textContent = 'Подтвердить';

       modalMain.append(inputTag);
       modalHeader.append(helloTag);
       modalFooter.append(modalBtn);
       modalForm.append(modalHeader, modalMain, modalFooter);
       overlay.append(modalForm);
      return  {
        modalForm,
        inputTag,
        overlay,
        modalBtn,
      }
  }


  const getRandomIntInclusive = (min, max) =>  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

const renderApp = (selectorApp) => {
    const appContainer = document.querySelector(selectorApp);
    const {modalForm, overlay,} = createModal();


    appContainer.append(overlay);

    return {
      modalForm,
      overlay,
    }
}

const idGenerate = () => {
  const id = getRandomIntInclusive(1, 30);
  return id;
}

const addNewTask = (taskInputValue, status, id , key) => {
    const list = document.querySelectorAll('tr');
    const numberItem = +list[list.length - 1].firstElementChild.textContent || 1;
    const tablelightLine = document.createElement('tr');

    tablelightLine.insertAdjacentHTML( 'beforeend', `<tr >
    <td>${numberItem + 1}</td>
    <td class="task">
      ${taskInputValue}
    </td>
    <td>${status}</td>
    <td>
      <button class="btn btn-danger" data-id = "${id}">
        Удалить
      </button>
      <button class="btn btn-success">
        Завершить
      </button>
    </td>
  </tr>`)
  tablelightLine.className = 'table-light';
    tBody.append(tablelightLine);

    return {
      taskInputValue,
      status,
      id,
    }
}

const renderUserTasks = (key) => {
  const data = getStorage(key);
  data.forEach((elem) => {
  addNewTask( elem.taskInputValue, elem.status, elem.id, key,);
  })
}

const modalControl  = (modalForm, overlay, form) => {

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    overlay.classList.remove('is-visible');

    let user = formData.get('username');
    console.log('user: ', user);

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
    renderUserTasks(userName);
  } );

}



const taskControl = () => {

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
    console.log(e.target.classList);
    if(taskInput.value ) {
      const {taskInputValue, status, id} = addNewTask( taskInput.value, 'В процессе', idGenerate(),  key);
      setStorage(key, {taskInputValue, status, id,});
      btnSave.setAttribute('disabled', '');
      form.reset();
    };
  }  );



  form.addEventListener('reset', (e) => {
    btnSave.setAttribute('disabled', '');
  })

};

const dltControl = () => {

  const deleteBtn = document.querySelector('.btn-danger');
  tBody.addEventListener('click', (e) => {
    const key = localStorage.getItem('user');
    console.log('key: ', key);
    if(e.target.closest('.btn-danger') && confirm('хотите удалить задачу?')){
      try{
        e.target.closest('.table-light').remove();
      } catch{
        e.target.closest('.table-success').remove();
      }
    }
    console.log(e.target.dataset.id)
    removeStorage(key, e.target.dataset.id);
  })
}

const successControl = () => {
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





const  init = () => {
    const {
      modalForm,
      overlay,
    } = renderApp('.app-container.vh-100');

    modalControl(modalForm, overlay, form);
    dltControl();
    taskControl();
    successControl();
};










document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    init();
});