import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.render(categories);
    this.scr();
  }

  render(arr) {
    this.elem.classList.add('ribbon');
    this.elem.innerHTML = `
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner"></nav>
    <button class="ribbon__arrow ribbon__arrow_right">
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

  scr(a, b) {
    let nav = this.elem.querySelector('.ribbon__inner');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    let scrollWidth = nav.scrollWidth;
    let scrollLeft = nav.scrollLeft;
    let clientWidth = nav.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    arrowLeft.classList.toggle('ribbon__arrow_visible');
    arrowRight.classList.toggle('ribbon__arrow_visible');

    arrowLeft.addEventListener('click', function() {
      nav.scrollBy(-350, 0);
      scrollLeft = nav.scrollLeft;
      scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollLeft == 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      } else if (scrollRight == 0) {
        arrowRight.classList.remove('ribbon__arrow_visible');
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        if (!arrowLeft.classList.contains('ribbon__arrow_visible')) {
          arrowLeft.classList.toggle('ribbon__arrow_visible');
        } else if (!arrowLeft.classList.contains('ribbon__arrow_visible')) {
          arrowRight.classList.toggle('ribbon__arrow_visible');
        }
      }

    });

    arrowRight.addEventListener('click', function() {
      nav.scrollBy(10, 0);
      scrollLeft = nav.scrollLeft;
      scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft == 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      } else if (scrollRight == 0) {
        arrowRight.classList.remove('ribbon__arrow_visible');
        arrowLeft.classList.add('ribbon__arrow_visible');
      } else {
        if (!arrowLeft.classList.contains('ribbon__arrow_visible')) {
          arrowLeft.classList.toggle('ribbon__arrow_visible');
        } else if (!arrowRight.classList.contains('ribbon__arrow_visible')) {
          arrowRight.classList.toggle('ribbon__arrow_visible');
        }
      }
    });
  }
}

