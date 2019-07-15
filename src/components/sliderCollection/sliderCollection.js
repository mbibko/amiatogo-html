import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination]);

const collectionSliderFunc = () => {
  const sliderContainer = document.querySelector('.sliderCollection')
  if(!sliderContainer) return;
  const slider = new Swiper(sliderContainer, {
    speed: 1000,
    slidesPerView: 'auto',
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
  slider.on('slideChange', () => {
    const pagination = sliderContainer.querySelector('.swiper-pagination-bullets')
    if (!pagination) return;
    const activeEl = pagination.querySelector('.swiper-pagination-bullet-active')
    pagination.style.transform = `translateX(calc(50% - ${activeEl.offsetLeft}px - 3px))`
  });
}
collectionSliderFunc()