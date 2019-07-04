import AOS from 'aos'
import lax from 'lax.js'
import './SmoothScroll.js'

const initAnimationsFunc = () => {
  const initAnimations = () => {

    // new SmoothScroll(document, 120, 12)

    AOS.init({
      duration: window.innerHeight > 500 ? 800 : 400,
      // offset: window.innerHeight > 500 ? 0 : 0,
      // delay: 50,
      // anchorPlacement: 'top-center',
      once: true,
      // mirror: true,
      easing: 'ease-in-out'
    });

    lax.setup({
      breakpoints: { small: 0, large: 1440 }
    }) // init

    const updateLax = () => {
      lax.update(window.scrollY)
      window.requestAnimationFrame(updateLax)
    }
    window.requestAnimationFrame(updateLax)
    if(typeof SmoothScroll != 'undefined') {
      SmoothScroll({
          frameRate : 150, 
          animationTime : 450,
          stepSize : 80,
      });
    }
  }


  if (document.body.classList.contains('has-loader')) {
    addEventListener('page-transition-ended', () => {
      initAnimations()
    });
  } else {
    document.body.classList.add('page-ready')
    initAnimations()
  }
}
initAnimationsFunc()