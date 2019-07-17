import { break_xl } from "../../js/constants";

// Import Swiper and modules
import { Swiper, Navigation, Pagination, Controller } from 'swiper/dist/js/swiper.esm.js';
// import Swiper from './swiper.js';

// Install modules
Swiper.use([Navigation, Pagination, Controller]);

const sectionSlidersFunc = () => {

  if(!document.querySelector('.fourSliders')) return

  let swipers = [] 

  swipers.push(new Swiper('.slider1', {
    speed: 1000,
    loop: true,
    preventInteractionOnTransition: true,
    slidesPerGroup: 1,
  }));
  swipers.push(new Swiper('.slider2', {
    speed: 1000,
    loop: true,
    preventInteractionOnTransition: true,
    slidesPerGroup: 1,
    loopedSlides: 3,
    slidesPerView: 'auto',
  }));
  swipers.push(new Swiper('.slider3', {
    speed: 1000,
    loop: true,
    preventInteractionOnTransition: true,
    slidesPerGroup: 1,
  }));
  swipers.push(new Swiper('.slider4', {
    speed: 1000,
    loop: true,
    preventInteractionOnTransition: true,
    slidesPerGroup: 1,

    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.slider-button-next',
      prevEl: '.slider-button-prev',
    },
    breakpoints: {
      1024: {
        loopedSlides: 3,
        slidesPerView: 'auto',
        longSwipesRatio: '3'
      }
    }
  }));

  let isSlidesChanging = false

  const syncSwipers = ( currentSwiper, direction ) => {
    swipers.forEach( swiper => {
      if(swiper == currentSwiper) return;
      swiper['slide'+direction]()
    });
    isSlidesChanging = false
  }

  swipers.forEach((swiper) => {
    swiper.on('slideNextTransitionStart', () => {
      if (isSlidesChanging) return;
      isSlidesChanging = true
      syncSwipers(swiper, 'Next')
    });
    swiper.on('slidePrevTransitionStart', () => {
      if (isSlidesChanging) return;
      isSlidesChanging = true
      syncSwipers(swiper, 'Prev')
    });
  });
}
setTimeout(() => {
  sectionSlidersFunc()
}, 10)