import tingle from 'tingle.js'
import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination]);

const modalStore = () => {
  [].forEach.call(document.querySelectorAll('.store-list__item'), item => {
    const link = item.querySelector('.linkfull:not(.inited)');
    const listener = () => {
      let slidesStr = '';
      const data = JSON.parse(item.dataset.modalImgs);
      data.urls.forEach((url, i) => {
      slidesStr += `<div class="modalStore__item swiper-slide"><img src="${url}" alt=""></div>`
      });
      const content = `
      <div class="modalStore swiper-container">
        <div class="modalStore__slides swiper-wrapper">${slidesStr}</div>
        <div class="slider-controls">
          <div class="slider-navigation">
            <div class="slider-button slider-button-prev"></div>
            <div class="slider-button slider-button-next"></div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    `;

      const modal = new tingle.modal({
        closeMethods: ['button', 'escape'],
        cssClass: ['modal-full'],
        onOpen: () => {
          const sliderContainer = modal.getContent().querySelector('.modalStore')
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
    link.addEventListener('click', listener, false);
    link.classList.add('inited');
  });
};
export default modalStore