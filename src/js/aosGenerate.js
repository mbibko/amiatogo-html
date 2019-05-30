import { wrap } from './helpers'

export default function () {
  const aosMes = document.querySelectorAll('.aos-me-container');
  [].forEach.call(aosMes, function (wrapper, indexContainer) {
    const aosMesEls = wrapper.querySelectorAll('.aos-me');
    [].forEach.call(aosMesEls, function (el, indexEl) {
      if(el.classList.contains('aos-me-initialized')) return;
      
      let delay = el.dataset.aosDelay || indexEl * 100;

      const aos = document.createElement('span');
      aos.classList.add('aos-me-wrap');
      const id = 'aos-me-wrap-' + indexContainer + '-' + indexEl;
      aos.id = id
      wrap(el, aos);
      el.insertAdjacentHTML('beforebegin', '<span data-aos-delay="' + delay + '" data-aos="slide-down" data-aos-anchor="#' + id + '"></span>');
      el.classList.add('aos-me-initialized')
    });
  });
}
