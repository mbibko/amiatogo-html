// import styles
//=====================================
// import 'aos/dist/aos.css'
import 'tingle.js/src/tingle.css'
import "tiny-slider/dist/tiny-slider.css"
import "swiper/dist/css/swiper.min.css"
import './sass/main.sass'

// import grid
//=====================================
import './js/grid'


// import components
//=====================================
import './components/mobileMenu'
import './components/columnsText'
import './components/slider'
import './components/catalog'
import './components/toggler'
import './components/join'
import './components/stores'
import './components/storesMap'
import './components/sliderColl'
import './components/animatedHoverButton'
import './components/sliderCollection'
import './components/modalStore'
import './components/modalCollection'
import './components/topLine'
import './components/toTop'
import './components/gallery'
import './components/collectionItems'
import './components/loader'
import './components/sliderStoreBlock'
import './components/showAnimate'
import './components/imgsSiblings'
import './components/centerText'
import './components/fourSliders'

// import scripts
//=====================================
import './js/initAnimations'
import './js/videoInit'
import './js/dinamic-links.js'
import './js/forms.js'
import './js/load-imgs.js'

// import icons
//=====================================
import './js/svg-sprite'

// if (window.pageYOffset > window.innerHeight) {
//   document.body.classList.add('page-section-next')
// }

if(location.hostname == 'localhost') {
  document.documentElement.classList.add('css-simple-grid')
}