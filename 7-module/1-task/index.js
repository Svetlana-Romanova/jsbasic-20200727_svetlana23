import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');

    this.render(categories);
    this.scroll(this.elem);
    this.elem.addEventListener('click', (event) => this.chooseCat(event));
  }

  render(arr) {
    this.elem.classList.add('ribbon');
    this.elem.innerHTML = `
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner"></nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    `;

    arr.forEach(element => {
      let nav = this.elem.querySelector('.ribbon__inner');
      let link = document.createElement('a');
      link.href = '#';
      link.classList.add('ribbon__item');
      link.setAttribute('data-id', `${element.id}`);
      link.innerHTML = `${element.name}`;
      nav.append(link);
    });
  }

  scroll(elem) {
    let nav = elem.querySelector('.ribbon__inner');
    let arrowLeft = elem.querySelector('.ribbon__arrow_left');
    let arrowRight = elem.querySelector('.ribbon__arrow_right');

    arrowLeft.addEventListener('click', moveLeft);
    arrowRight.addEventListener('click', moveRight);
    nav.addEventListener('scroll', hideArrow);

    function moveLeft() {
      nav.scrollBy(-350, 0);
    }

    function moveRight() {
      nav.scrollBy(350, 0);
    }

    function hideArrow() {
      let scrollWidth = nav.scrollWidth;
      let clientWidth = nav.clientWidth;
      let scrollLeft = nav.scrollLeft;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        arrowLeft.classList.add('ribbon__arrow_visible');
        arrowRight.classList.remove('ribbon__arrow_visible');
      }
    }
  }

  chooseCat(event) {
    event.preventDefault();

    let item = event.target.closest('.ribbon__item');

    if (item) {
      let arr = this.elem.querySelectorAll('.ribbon__item');

      arr.forEach(function(el) {
        if (el.classList.contains('ribbon__item_active')) {
          el.classList.remove('ribbon__item_active');
        }
      });
      item.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: item.getAttribute('data-id'),
        bubbles: true
      }));
    }
  }
}

