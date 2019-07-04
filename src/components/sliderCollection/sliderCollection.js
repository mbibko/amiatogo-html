import { tns } from "tiny-slider/src/tiny-slider"

const nav = document.createElement('div')
const inner = document.createElement('div')
nav.classList.add('tns-nav')
inner.appendChild(document.createElement('button'))
inner.appendChild(document.createElement('button'))
inner.appendChild(document.createElement('button'))
inner.appendChild(document.createElement('button'))
nav.appendChild(inner)

const collectionSliderFunc = () => {
  const container = document.querySelector('.sliderCollection')
  if(!container) return;
  container.appendChild(nav)
  const slider = tns({
    container: container.querySelector('.sliderCollection__slides'),
    // startIndex: 1,
    mouseDrag: true,
    items: 2,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    // preventActionWhenRunning: true,
    controls: true,
    controlsPosition: 'bottom',
    autoWidth: true,
    loop: true,
    nav: true,
    navContainer: inner,
    // navPosition: 'top',
    onInit: () => {

    }
  });
  slider.events.on('indexChanged', info => {
    container.querySelector('.slider-counter__1').textContent = info.displayIndex
    setTimeout(() => {
      const activeEl = nav.querySelector('.tns-nav-active')
      console.dir(activeEl);
      inner.style.transform = `translateX(calc(50% - ${activeEl.offsetLeft}px - 3px))`
    }, 100)
  });
}
collectionSliderFunc()