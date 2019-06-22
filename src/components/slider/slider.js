import { tns } from "tiny-slider/src/tiny-slider"

;[].forEach.call(document.querySelectorAll('.slider__slides'), (sliderContainer, i) => {
  const offsetLeft = sliderContainer.offsetLeft
  sliderContainer.parentNode.style.paddingLeft = 0
  const itemsWidth = sliderContainer.children[0].offsetWidth

  const productsSlider = tns({
    // items: 3,
    container: sliderContainer,
    mouseDrag: true,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: true,
    navPosition: 'bottom',
    controlsPosition: 'bottom',
    // controls: false,
    edgePadding: offsetLeft,
    fixedWidth: itemsWidth,
    onInit: info => {
      sliderContainer.querySelector('.tns-slide-active').classList.add('is-active-slide')
      // let isClassSetted = false;
      // [].forEach.call(info.slideItems, function (el, i) {
        //   if (isClassSetted || !el.classList.contains('tns-slide-active')) return;
        //   isClassSetted = true
      //   el.classList.add('is-first');
      // });
    }
  });
  // let isActive = false
  productsSlider.events.on('indexChanged', info => {
    setTimeout(() => {
      sliderContainer.classList.add('is-slide-changed')
    }, 1000)
  //   if (isActive) return;
  //   setTimeout(() => {
  //     isActive = true
  //     info.container.classList.add('is-active')
  //   }, 2000)
  });
})
