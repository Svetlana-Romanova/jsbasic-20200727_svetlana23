export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createSlider(this.steps, this.value);
    this.moveSlider(this.elem, this.steps);
  }

  createSlider(steps, value) {
    let slider = document.createElement('div');
    slider.classList.add('slider');

    let sliderTags = `
    <div class="slider__thumb">
    <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress"></div>
    </div>`;
    slider.insertAdjacentHTML('afterbegin', sliderTags);

    let stepsList = document.createElement('div');
    stepsList.classList.add('slider__steps');
    slider.insertAdjacentElement('beforeend', stepsList);

    for (let i = 0; i < steps; i++) {
      let newSpan = document.createElement('span');
      stepsList.append(newSpan);
    }

    return slider;
  }

  moveSlider(elem, steps) {
    let valueS = this.elem.querySelector('.slider__value');
    let thumb = this.elem.querySelector('.slider__thumb');
    let stepsS = this.elem.querySelectorAll('span');
    let progress = this.elem.querySelector('.slider__progress');

    elem.addEventListener('click', (event) => {

      stepsS.forEach(function(item) {
        if (item.classList.contains('slider__step-active')) {
          item.classList.remove('slider__step-active');
        }
      });

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      valueS.innerHTML = `${value}`;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      stepsS[value].classList.add('slider__step-active');

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });
  }
}
