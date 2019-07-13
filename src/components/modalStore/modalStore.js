import tingle from 'tingle.js'
import { tns } from "tiny-slider/src/tiny-slider"

const modalStore = () => {
  [].forEach.call(document.querySelectorAll('.store-list__item'), item => {
    const link = item.querySelector('.linkfull:not(.inited)');
    const listener = () => {
      let slidesStr = '';
      const data = JSON.parse(item.dataset.modalImgs);
      data.urls.forEach((url, i) => {
        slidesStr += `<div class="modalStore__item"><img src="${url}" alt=""></div>`
      });
      const content = `
      <div class="modalStore">
        <div class="slider-sett">
          <div class="slider-counter">
            <div class="slider-counter__1">1</div>/
            <div class="slider-counter__2">${data.urls.length}</div>
          </div>
        </div>
        <div class="modalStore__slides">${slidesStr}</div>
      </div>
    `;

      const modal = new tingle.modal({
        closeMethods: ['button', 'escape'],
        cssClass: ['modal-full'],
        onOpen: () => {
          const sliderContainer = modal.getContent().querySelector('.modalStore')
          const slidesContainer = sliderContainer.querySelector('.modalStore__slides')
          slidesContainer.style.height = window.innerHeight + 'px'
          // console.log(modal.getContent().querySelector('.modalStore__slides'));
          const itemsWidth = slidesContainer.children[0].offsetWidth
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
            sliderContainer.querySelector('.slider-counter__1').textContent = info.displayIndex
          });

        }
      });
      modal.setContent(content);
      modal.open();
    };
    link.addEventListener('click', listener, false);
    link.classList.add('inited');
  });
};
export default modalStore