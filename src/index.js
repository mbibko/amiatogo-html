import './sass/main.sass'

import { scrollToTop, setContainerHeight } from './js/helpers'

import './media/sprite-images/logo.svg'
import './media/sprite-images/logo1.svg'
import './media/sprite-images/icon-facebook.svg'
import './media/sprite-images/icon-twitter.svg'
import './media/sprite-images/icon-pinterest.svg'
import './media/sprite-images/icon-vkontakte.svg'
import './media/sprite-images/icon-email.svg'

import loader from './js/loader'
import sectionSliders from './js/sectionSliders'
import productsSlider from './js/productsSlider'
import indexCatalog from './js/indexCatalog'
import aosGenerate from './js/aosGenerate'
import initAnimations from './js/initAnimations'
import videoInit from './js/videoInit'

const top = document.querySelector('.top');
if(top) {
  setContainerHeight(top)
}
loader()
videoInit()
aosGenerate()
initAnimations()


if(window.pageYOffset > window.innerHeight) {
  document.body.classList.add('page-section-next')
}

var lastScrollTop = 0;
const topLine = document.querySelector('.top-line')

addEventListener('scroll', e => {
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop || window.pageYOffset < window.innerHeight){
     topLine.classList.remove('active')
  } else {
    topLine.classList.add('active')
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

const toTopFunc = () => {
  const toTop = document.querySelector('.to-top');
  if(!toTop) return;
  toTop.addEventListener('click', () => {
    scrollToTop(500);
  });
  window.addEventListener('scroll', () => {
    if(window.pageYOffset < window.innerHeight) return;
  
    toTop.classList.add('active')
  });
}

toTopFunc()

sectionSliders()
productsSlider()
indexCatalog()

const loadMoreGalleryItems = () => {
  const gallery = document.querySelector('.gallery')
  const galleryMoreLink = gallery.querySelector('.js-gallery-more')
  const galleryItems = gallery.querySelector('.gallery__items-inner')
  if(!galleryMoreLink) return;
  galleryMoreLink.addEventListener('click', () => {
    fetch('data-gallery-items.html')
      .then(function(response) {
        // console.log(response)
        return response.text()
      })
      .then(function(text) {
        console.log(text)
        galleryItems.insertAdjacentHTML('beforeend', text);
        aosGenerate()
      })
      // .catch( alert );
  })
}
loadMoreGalleryItems()

addEventListener('page-ready', () => {
  const lazies = document.querySelectorAll('.lazy-me');
  [].forEach.call(lazies, img => {
    img.setAttribute('src', img.getAttribute('data-src'))
  })
});
