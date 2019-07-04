import { tns } from "tiny-slider/src/tiny-slider"

const sectionSlidersFunc = () => {

  if(!document.querySelector('.fourSliders')) return

  let sliders = []

  const setElActiveClass = slides => {
    let isClassAdded = false;
    [].forEach.call(slides, function (el, i) {
      if (!isClassAdded && el.classList.contains('tns-slide-active')) {
        el.classList.add('tns-slide-active-first')
        isClassAdded = true
      } else {
        el.classList.remove('tns-slide-active-first')
      }
    });
  }

  const slider1SlidesContainer = document.querySelector('.slider1 > div')
  const slider2SlidesContainer = document.querySelector('.slider2 > div')
  const slider3SlidesContainer = document.querySelector('.slider3 > div')
  const slider4SlidesContainer = document.querySelector('.slider4 > div')

  sliders.slider1 = tns({
    container: slider1SlidesContainer,
    mouseDrag: true,
    items: 1,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    preventActionWhenRunning: true,
    controls: false
  });
  sliders.slider2 = tns({
    container: slider2SlidesContainer,
    mouseDrag: true,
    items: 2,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    preventActionWhenRunning: true,
    controls: false,
    fixedWidth: slider2SlidesContainer.children[0].offsetWidth,
    // onInit: info => setElActiveClass(info.slideItems)
  });

  sliders.slider3 = tns({
    container: slider3SlidesContainer,
    mouseDrag: true,
    items: 1,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    preventActionWhenRunning: true,
    controls: false
  });

  sliders.slider4 = tns({
    container: slider4SlidesContainer,
    mouseDrag: true,
    items: 1,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    preventActionWhenRunning: true,
    fixedWidth: slider4SlidesContainer.children[0].offsetWidth,
    nav: true,
    navPosition: 'bottom'
  });

  sliders.slider2.events.on('indexChanged', info => setElActiveClass(info.slideItems));
  const getDirection = info => {
    return (info.indexCached == info.slideCount && info.index == 1) || info.index == ++info.indexCached ? 'next' : 'prev';
  }
  const customizedFunction = (info, eventName) => {
    const direction = getDirection(info);
    // console.log(info.displayIndex)
    // console.log(info.slideItems[info.displayIndex - 1]);
    [].forEach.call(info.slideItems, el => {
      el.classList.remove('before-active')
    });
    info.slideItems[info.displayIndex - 1].classList.add('before-active')
    for(let i=1; i<=4; i++) {
      sliders['slider'+i].events.off('transitionStart', customizedFunction);
    }
    for(let i=1; i<=4; i++) {
      sliders['slider'+i].getInfo().container.classList.remove('dir-prev', 'dir-next');
      sliders['slider'+i].getInfo().container.classList.add('dir-'+direction);
      if(sliders['slider'+i].getInfo().container == info.container) continue;
      
      sliders['slider'+i].goTo(direction)
    }
    for(let i=1; i<=4; i++) {
      sliders['slider'+i].events.on('transitionStart', customizedFunction);
    }
  }
  
  for(let i=1; i<=4; i++) {
    sliders['slider'+i].events.on('transitionStart', customizedFunction);
  }
}
setTimeout(() => {
  sectionSlidersFunc()
}, 10)