import { wrap } from '../../js/helpers'

export default function() {
  ;[].forEach.call(document.querySelectorAll('.aos-me-container'), (wrapper, indexContainer) => {
    const aosMesEls = wrapper.querySelectorAll('.aos-me');
    [].forEach.call(aosMesEls, function (el, indexEl) {
      if(el.parentNode.classList.contains('aos-me-initialized')) return;
      const aos = document.createElement('span');
      aos.classList.add('aos-me-wrap');
      
      let delay = el.dataset.aosDelay || indexEl * 100;

      const id = 'aos-me-wrap-' + indexContainer + '-' + indexEl;
      aos.id = id
      wrap(el, aos);
      el.insertAdjacentHTML('beforebegin', '<span data-aos-delay="' + delay + '" data-aos="slide-down" data-aos-anchor="#' + id + '"></span>');
      aos.classList.add('aos-me-initialized')
    });
  });
}
