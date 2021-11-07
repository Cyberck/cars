class SCROLL {
  constructor(set) {
    if (typeof set.el == 'string') {
      this.el = document.querySelector(set.el);
    } else if (set.el instanceof HTMLElement) {
      this.el = set.el;
    }

    this.top = set.top ?? this.el.offsetTop;
    this.el.style.position = 'fixed';
    this.unit = set.unit;
    this.el.style.top = `${this.scrollNumber()}px`;
    window.addEventListener('scroll', () => this.scroll());
    window.addEventListener('resize', () => this.scroll());
  }

  scroll() {
    this.scrolled = this.scrollNumber();

    if (this.scrolled - scrollY > 0) {
      this.el.style.top = this.scrolled - scrollY + 'px';
    } else {
      this.el.style.top = 0;
    }
  }

  scrollNumber() {
    if (this.unit == 'px') {
      return this.top >= 0 ? this.top : 0;
    } else if (this.unit == '%' || this.unit == undefined) {
      return this.calc(window.innerHeight, this.top) - this.el.clientHeight;
    }
  }

  calc(height, top) {
    return height / 100 * top;
  }

}

let myScroll = new SCROLL({
  el: '.header__nav',
  unit: 'px'
});
let btn = document.querySelector('.header__btn'),
    list = document.querySelector('.header__nav-list'),
    bg = document.querySelector('.bg');
btn.addEventListener('click', () => {
  list.classList.add('active');
  bg.classList.add('active');
});
bg.addEventListener('click', () => {
  list.classList.remove('active');
  bg.classList.remove('active');
});