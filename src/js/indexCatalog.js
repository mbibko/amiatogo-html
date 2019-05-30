import { checkVisible } from './helpers'

export default function() {


  ;(() => {
    const stickyEl = document.querySelector('.i-catalog-menu-sticky');
    if(!stickyEl) return;
    stickyEl.style.top = window.innerHeight / 2 - stickyEl.offsetHeight / 2 + 'px'
  })();


  const wrapper = document.querySelector('.index-catalog__imgs');
  if(!wrapper) return;
  const elements = wrapper.querySelectorAll('.index-catalog__imgs-item');
  const menuWrapper = document.querySelector('.i-catalog-menu');
  const menuElsTop = menuWrapper.querySelector('.i-catalog-menu-top .inner');
  const menuElsMiddle = menuWrapper.querySelector('.i-catalog-menu-middle .inner');
  const menuElsBottom = menuWrapper.querySelector('.i-catalog-menu-bottom .inner');


  const addActiveClass = () => {
    let isClassAdded = false;
    if(!checkVisible(wrapper, 240)) return; 
    [].forEach.call(elements, function(el, i) {
      if(!isClassAdded && checkVisible(el, 240)) {
        menuElsTop.style.transform = 'translateY(calc(100%/3*'+(3-i)+'))';
        menuElsMiddle.style.transform = 'translateY(calc(-100%/3*'+i+'))';
        menuElsBottom.style.transform = 'translateY(calc(-100%/3*'+(i + 1)+'))';
        isClassAdded = true
      }
    });
  }
  window.addEventListener('scroll', function() {
    addActiveClass()
  })
}