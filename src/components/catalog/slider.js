import { Swiper, Navigation, Pagination, Controller } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Pagination]);

let slidersImgs = [];
let slidersInitiated = false;

const initSliders = () => {
  [].forEach.call(document.querySelectorAll('.catalog-slider'), sliderContainer => {
    const slider = new Swiper(sliderContainer, {
      speed: 1000,
      slidesPerView: 'auto',

      pagination: {
        el: '.swiper-pagination',
      },
      breakpoints: {
        1024: {
          speed: 300
        }
      }
    })

    slidersImgs.push(slider)
  });
  slidersInitiated = true
}

if (window.innerWidth <= 600) {
  initSliders()
}

window.addEventListener('resize', () => {
  setTimeout(() => {
    if (window.innerWidth <= 600) {
      if(!slidersInitiated) {
        initSliders()
      }
    } else {
      slidersImgs.forEach(item => {
        item.destroy()
      });
      slidersInitiated = false
    }
  }, 500)
});