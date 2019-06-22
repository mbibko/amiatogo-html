import { tns } from "tiny-slider/src/tiny-slider"

const collectionSliderFunc = () => {
  const container = document.querySelector('.sliderCollection')
  if(!container) return;
  const slider = tns({
    container: container.querySelector('.sliderCollection__slides'),
    // startIndex: 1,
    mouseDrag: true,
    items: 2,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    preventActionWhenRunning: true,
    controls: true,
    controlsPosition: 'bottom',
    autoWidth: true,
    center: false,
    loop: true,
    nav: true,
    navPosition: 'top'
  });
  slider.events.on('indexChanged', info => {
    container.querySelector('.slider-counter__1').textContent = info.displayIndex
  });
}
collectionSliderFunc()