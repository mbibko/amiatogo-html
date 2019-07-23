import tingle from 'tingle.js'
import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination]);

const modalStore = () => {
  [].forEach.call(document.querySelectorAll('.js-modal-store-item:not(.modal-store-inited)'), item => {
    const link = item.querySelector('.js-modal-store-trigger');
    const data = JSON.parse(item.dataset.modalImgs);
    if(!data.urls.length) return;
    const listener = () => {
      let slidesStr = '';
      let controls = '';
      data.urls.forEach((url, i) => {
      slidesStr += `<div class="modalStore__item swiper-slide"><img src="${url}" alt=""></div>`
      });
      if(data.urls.length > 1) {
        controls = `
        <div class="slider-controls">
          <div class="slider-navigation">
            <div class="slider-button slider-button-prev"></div>
            <div class="slider-button slider-button-next"></div>
          </div>
          <div class="swiper-pagination"></div>
        </div>`
      }
      const content = `
      <div class="modalStore swiper-container ${data.urls.length < 2 ? 'slider-disabled' : ''}">
        <div class="modalStore__slides swiper-wrapper">${slidesStr}</div>
        ${controls}
      </div>
    `;

      const modal = new tingle.modal({
        closeMethods: ['button', 'escape'],
        cssClass: ['modal-full'],
        onOpen: () => {
          const sliderContainer = modal.getContent().querySelector('.modalStore')
          if(data.urls.length < 2) return;
          new Swiper(sliderContainer, {
            speed: 1000,
            slidesPerView: 1,
            loop: true,
            loopedSlides: 3,

            pagination: {
              el: '.swiper-pagination',
              type: 'fraction',
            },
            navigation: {
              nextEl: '.slider-button-next',
              prevEl: '.slider-button-prev',
            },
            breakpoints: {
              1024: {
                pagination: {
                  el: '.swiper-pagination',
                  type: 'bullets',
                },
              }
            }
          });
        }
      });
      modal.setContent(content);
      modal.open();
    };

    if (link) {
      link.addEventListener('click', listener, false);
      item.classList.add('modal-store-inited');
    }
  });
};
export default modalStore