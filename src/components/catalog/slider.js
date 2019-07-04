import { tns } from "tiny-slider/src/tiny-slider"

let slidersImgs = [];
let slidersInitiated = false;

const initSliders = () => {
  [].forEach.call(document.querySelectorAll('.catalog-slider > div'), sliderContainer => {
    const offsetLeft = sliderContainer.offsetLeft
    sliderContainer.parentNode.style.paddingLeft = 0
    const slider = tns({
      container: sliderContainer,
      // startIndex: 1,
      mouseDrag: true,
      items: 2,
      speed: 1000,
      swipeAngle: 30,
      autoplay: false,
      autoplayButtonOutput: false,
      nav: false,
      preventActionWhenRunning: true,
      controls: false,
      edgePadding: offsetLeft,
      fixedWidth: sliderContainer.children[0].offsetWidth,
      // center: true,
      loop: false,
      nav: true,
      navPosition: 'bottom',
      onInit: info => {
        sliderContainer.querySelector('.tns-slide-active').classList.add('is-active-slide')
      }
    });
    slider.events.on('indexChanged', info => {
      setTimeout(() => {
        sliderContainer.classList.add('is-slide-changed')
      }, 1000)
    });

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