import { Swiper, Navigation, Pagination, Controller } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination, Controller]);

;[].forEach.call(document.querySelectorAll('.slider__slidesWrapper'), (sliderContainer, i) => {
  new Swiper(sliderContainer, {
    speed: 1000,
    slidesPerView: 'auto',

    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.slider-button-next',
      prevEl: '.slider-button-prev',
    },
    breakpoints: {
      1024: {
        speed: 300
      }
    }
  })
})
