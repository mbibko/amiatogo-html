import SmoothScroll from './smooth-scroll'

export default function () {
  const initAnimations = () => {
    // new SmoothScroll(document, 120, 12)

    AOS.init({
      duration: 800,
      offset: -200,
      // delay: 50,
      anchorPlacement: 'top-center',
      // once: true,
      // mirror: true,
      easing: 'ease-in-out'
    });

    lax.setup() // init

    const updateLax = () => {
      lax.update(window.scrollY)
      window.requestAnimationFrame(updateLax)
    }
    window.requestAnimationFrame(updateLax)
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