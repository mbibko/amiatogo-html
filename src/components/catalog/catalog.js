import { checkVisible, move } from '../../js/helpers'
import './slider.js'


;(() => {
  const stickyEl = document.querySelector('.catalog-menu-sticky');
  if(!stickyEl) return;
  stickyEl.style.top = window.innerHeight / 2 - stickyEl.offsetHeight / 2 + 'px'
})();


;(() => {
  const wrapper = document.querySelector('.catalog__imgs');
  if(!wrapper) return;
  const elements = wrapper.querySelectorAll('.catalog__imgs-item');
  const menuWrapper = document.querySelector('.catalog-menu');
  const menuElsTop = menuWrapper.querySelector('.catalog-menu-top .inner');
  const menuElsMiddle = menuWrapper.querySelector('.catalog-menu-middle .inner');
  const menuElsBottom = menuWrapper.querySelector('.catalog-menu-bottom .inner');
  const elsLength = elements.length


  let menuMiddleMaxWidth = 0;
  [].forEach.call(menuElsMiddle.querySelectorAll('[data-letters]'), function(el, i) {
    console.log(el.offsetWidth, menuMiddleMaxWidth);
    if(el.offsetWidth > menuMiddleMaxWidth) menuMiddleMaxWidth = el.offsetWidth
  });
  menuElsMiddle.parentNode.style.width = menuMiddleMaxWidth + 100 + 'px';

  const moveTitles = () => {
    [].forEach.call(elements, function(el, i) {
      const from = el.querySelector('.imgs-grid__text');
      const to = el.querySelector('.catalog__imgs-item__title');
      if(!from) return;
      move(from, to, 1280)
    });
  }
  moveTitles()

  window.addEventListener('resize', () => {
    moveTitles()
  });

  const addActiveClass = () => {
    let isClassAdded = false;
    if(!checkVisible(wrapper, 240)) return; 
    [].forEach.call(elements, function(el, i) {
      if(!isClassAdded && checkVisible(el, 240)) {
        menuElsTop.style.transform = 'translateY(calc(100%/'+elsLength+'*'+(elsLength-i)+'))';
        menuElsMiddle.style.transform = 'translateY(calc(-100%/'+elsLength+'*'+i+'))';
        menuElsBottom.style.transform = 'translateY(calc(-100%/'+elsLength+'*'+(i + 1)+'))';
        isClassAdded = true
      }
    });
  }
  window.addEventListener('scroll', () => {
    addActiveClass()
  })
})();