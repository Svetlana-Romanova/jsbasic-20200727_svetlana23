import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.createModal();
    this.closeX();
  }

  createModal() {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>`;

    let btn = document.querySelector('.button');
    btn.addEventListener('click', () => {
      let body = document.querySelector('body');
      body.append(this.elem);
      body.classList.add('is-modal-open');
    });

    return modal;

  }

  open() {
    let body = document.querySelector('body');
    body.append(this.elem);
    body.classList.add('is-modal-open');
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody(elem) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(elem);
  }

  close() {
    this.elem.remove();
    let body = document.querySelector('body');
    body.classList.remove('.is-modal-open');
  }

  closeX() {
    let close = this.elem.querySelector('.modal__close');
    close.addEventListener('click', () => this.close());
  }
}
