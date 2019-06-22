import iconMarkerMap from '../../media/marker-map.svg'
import { tns } from "tiny-slider/src/tiny-slider"

const storeFunc = () => {
  [].forEach.call(document.querySelectorAll('.store-list__item:not(.inited)'), item => {
    const link = item.querySelector('.store-content__link')
    link.addEventListener('click', () => {
      item.classList.toggle('is-active')
    });
    const slidesContainer = item.querySelector('.store-slider-slides')
    const itemsWidth = slidesContainer.children[0].offsetWidth
    // [].forEach.call(container.children, item => {
    //   item.style.width = item.offsetWidth + 'px'
    // })
    const slider = tns({
      container: slidesContainer,
      // startIndex: 1,
      mouseDrag: true,
      speed: 1000,
      swipeAngle: 30,
      autoplay: false,
      autoplayButtonOutput: false,
      preventActionWhenRunning: true,
      controls: true,
      controlsPosition: 'bottom',
      fixedWidth: itemsWidth,
      center: false,
      loop: true,
      nav: true,
      navPosition: 'bottom'
    });
    slider.events.on('indexChanged', info => {
      item.querySelector('.slider-counter__1').textContent = info.displayIndex
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
