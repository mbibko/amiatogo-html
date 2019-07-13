import { scrollToTop } from '../../js/helpers'

const toTopFunc = () => {
  const toTop = document.querySelector('.to-top');
  if (!toTop) return;
  toTop.addEventListener('click', () => {
    scrollToTop(500);
  });
  window.addEventListener('scroll', () => {
    if (window.pageYOffset < window.innerHeight) return;

    toTop.classList.add('active')
  });
}

toTopFunc()