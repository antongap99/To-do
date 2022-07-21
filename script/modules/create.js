
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

const addNewTask = (taskInputValue, status, id , tBody) => {
    const list = document.querySelectorAll('tr');
    let numberItem = +list[list.length - 1].firstElementChild.textContent || 0;
    const tablelightLine = document.createElement('tr');

    tablelightLine.insertAdjacentHTML( 'beforeend', `<tr >
    <td>${++numberItem}</td>
    <td class="task"  contenteditable="true">
      <p>${taskInputValue}</p>
    </td>
    <td>${status}</td>
    <td>
      <button class="btn btn-danger" data-id = "${id}" >
        Удалить
      </button>
      <button class="btn btn-success">
        Завершить
      </button>
    </td>
  </tr>`)
  tablelightLine.classList = 'table-row table-light';
    tBody.append(tablelightLine);

    return {
      taskInputValue,
      status,
      id,
    }
}


export default {
    createModal,
    addNewTask,
    createNameTag,
}