import { break_xl } from "../../js/constants";
import iconMarkerMap from '../../media/marker-map.svg'
import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination]);

const storeFunc = () => {
  [].forEach.call(document.querySelectorAll('.store-list__item:not(.inited)'), item => {
    const link = item.querySelector('.store-content__link')
    link.addEventListener('click', () => {
      item.classList.toggle('is-active')
    });
    const sliderContainer = item.querySelector('.store-slider')
    new Swiper(sliderContainer, {
      speed: 1000,
      slidesPerView: 1,
      loop: true,
      loopedSlides: 3,

      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
      },
      breakpoints: {
        1024: {
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
        }
      }
    });
    const mapContainer = item.querySelector('.store-map__inner')
    const position = {lat: +mapContainer.dataset.lat, lng: +mapContainer.dataset.lng}
    const map = new google.maps.Map(mapContainer, {
      center: position,
      zoom: 17,
      disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
      position: position,
      icon: iconMarkerMap,
      map: map
    });
    item.classList.add('inited')
  });
}
storeFunc();

const loadMoreStoreItems = () => {
  const container = document.querySelector('.stores-wrapper')
  if(!container) return;
  const link = container.querySelector('.js-store-items-more')
  const itemsContainer = container.querySelector('.store-list')
  if (!link) return;
  link.addEventListener('click', () => {
    fetch('data-store-items.html')
      .then(function (response) {
        // console.log(response)
        return response.text()
      })
      .then(function (text) {
        // console.log(text)
        itemsContainer.insertAdjacentHTML('beforeend', text);
        storeFunc()
        aosGenerate()
      })
    // .catch( alert );
  })
}
loadMoreStoreItems()
