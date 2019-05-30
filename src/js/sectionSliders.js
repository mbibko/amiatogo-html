export default function () {

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

  sliders.slider1 = tns({
    container: document.querySelector('.slider1 > div'),
    mouseDrag: true,
    items: 1,
    speed: 1000,
    mode: 'gallery',
    animateIn: 'tns-rollIn',
    animateOut: 'tns-rollOut',
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    preventActionWhenRunning: true,
    controls: false
  })
  sliders.slider2 = tns({
    container: document.querySelector('.slider2 > div'),
    mouseDrag: true,
    items: 2,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    preventActionWhenRunning: true,
    controls: false,
    onInit: info => setElActiveClass(info.slideItems)
  });

  sliders.slider3 = tns({
    container: document.querySelector('.slider3 > div'),
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
    container: document.querySelector('.slider4 > div'),
    mouseDrag: true,
    items: 1,
    speed: 1000,
    mode: 'gallery',
    animateIn: 'tns-rollIn',
    animateOut: 'tns-rollOut',
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    preventActionWhenRunning: true,
    onInit: () => {
      // document.querySelector('.slider4').querySelector('.tns-controls [data-controls="prev"]').addEventListener('click', () => {
      //   sliders.slider1.goTo('prev')
      //   sliders.slider2.goTo('prev')
      //   sliders.slider3.goTo('prev')
      // });
      // document.querySelector('.slider4').querySelector('.tns-controls [data-controls="next"]').addEventListener('click', () => {
      //   sliders.slider1.goTo('next')
      //   sliders.slider2.goTo('next')
      //   sliders.slider3.goTo('next')
      // });
    }
  });

  sliders.slider2.events.on('indexChanged', info => setElActiveClass(info.slideItems));
  const getDirection = info => {
    return (info.indexCached == info.slideCount && info.index == 1) || info.index == ++info.indexCached ? 'next' : 'prev';
  }
  const customizedFunction = (info, eventName) => {
    const direction = getDirection(info)
    console.log(direction)
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