import { break_lg } from "../../js/constants";
import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination]);

export default function(sliderContainer) {
  const multipleItems = sliderContainer.querySelector('.swiper-wrapper').children.length > 1 ? true : false;
  
  new Swiper(sliderContainer, {
    speed: 1000,
    slidesPerView: multipleItems ? 'auto' : 1,
    loop: multipleItems ? true : false,
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
      [break_lg]: {
        speed: 300,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      }
    }
  });
}
