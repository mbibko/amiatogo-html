export default function () {
  const sliderContainer = document.querySelector('.products-slider > div')
  if (!sliderContainer) return;
  const productsSlider = tns({
    container: sliderContainer,
    mouseDrag: true,
    items: 4,
    speed: 1000,
    swipeAngle: 30,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    controlsPosition: 'bottom',
    // controls: false
    onInit: info => {
      let isClassSetted = false;
      [].forEach.call(info.slideItems, function (el, i) {
        if (isClassSetted || !el.classList.contains('tns-slide-active')) return;
        isClassSetted = true
        el.classList.add('is-first');
      });
    }
  });
  let isActive = false
  productsSlider.events.on('indexChanged', info => {
    if (isActive) return;
    setTimeout(() => {
      isActive = true
      info.container.classList.add('is-active')
    }, 2000)
  });
}