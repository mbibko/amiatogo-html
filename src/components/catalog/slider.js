import { tns } from "tiny-slider/src/tiny-slider"

let slidersImgs = [];
let slidersInitiated = false;

const initSliders = () => {
  [].forEach.call(document.querySelectorAll('.catalog-slider > div'), container => {
    const startIndex = container.getAttribute('data-start')
    slidersImgs.push(tns({
      container: container,
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
      autoWidth: true,
      // center: true,
      loop: true,
      nav: true,
      navPosition: 'bottom'
    })
    )
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