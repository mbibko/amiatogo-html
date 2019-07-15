import { break_xl } from "../../js/constants";
import iconMarkerMap from '../../media/marker-map.svg'
import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination]);
import ajaxLoad from '../../js/ajaxLoad'
import modalStore from '../modalStore/modalStore'

const scrollToStore = id => {
  setTimeout(() => {
    window.scrollTo({
        top: document.querySelector(`.store-list__item[data-id="${id}"]`).getBoundingClientRect().top + pageYOffset,
        behavior: "smooth"
    });
  }, 1000)
};

const scrollToStoreMap = id => {
  const item = document.querySelector(`.store-list__item[data-id="${id}"]`);
  item.classList.toggle('is-active');
  setTimeout(() => {
    window.scrollTo({
        top: item.querySelector('.store-map').getBoundingClientRect().top + pageYOffset - 300,
        behavior: "smooth"
    });
  }, 1500)
};

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
};

document.addEventListener('DOMContentLoaded', () => {
  storeFunc();
  modalStore();

  ajaxLoad('.ajax-list',() => {
    storeFunc();
    modalStore();
  });
}, false);

let city_filter = document.querySelector('.js-map-city-filter');

if (city_filter !== null) {
  city_filter.addEventListener('change', e => {
    const container = document.querySelector('.ajax-list');
    if (!container) return;
    const params = {'AJAX_PAGE': 'Y', 'CONTAINER': 'ajax'};
    const ajaxLoaderClass = 'loading';

    let name = e.target.name,
        value = e.target.value,
        url = new URL( window.location.href),
        data = {};

    Object.defineProperty(data, name, {value: value, enumerable: true, configurable: true, writable: true});
    Object.assign(data, params);

    Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));

    container.classList.add(ajaxLoaderClass);

    fetch(url.pathname + url.search, {
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then(response => response.text())
    .then(function (text) {
      container.innerHTML = text;
      container.classList.remove(ajaxLoaderClass);

      storeFunc();
      modalStore();
    });
  });
}