import tingle from 'tingle.js'
import { tns } from "tiny-slider/src/tiny-slider"
import animatedHoverButton from '../animatedHoverButton/animatedHoverButton.js'
import modalShare from "./modalShare";

function modalCollection() {
  const links = document.querySelectorAll('.js-cool-modal:not(.inited)');
  if(!links) return;

  const page_data = window.page_data || {};
  const generateSideHtml = item => {
    return `
          <div class="coll-modal-side__top">
              <div class="coll-modal-side__item">
                <div class="coll-modal-side__title">Артикул</div>
                <div class="coll-modal-side__subtitle">${item.art}</div>
              </div>
              <div class="coll-modal-side__item">
                <div class="coll-modal-side__title">Коллекция</div>
                <div class="coll-modal-side__subtitle coll-modal-side__subtitle_underline">${item.collection}</div>
              </div>
          </div>
          <div class="coll-modal-side__item">
            <div class="coll-modal-side__title">Состав</div>
            <div class="coll-modal-side__text">${item.includes}</div>
          </div>
          <div class="coll-modal-side__item">
            <div class="coll-modal-side__title">О модели</div>
            <div class="coll-modal-side__text">${item.about}</div>
          </div>
          <div class="coll-modal-side__item">
            <div class="coll-modal-side__title">Размеры</div>
            <div class="coll-modal-side__text">${item.sizes}</div>
          </div>
          <div class="coll-modal-side__footer">
              <div class="coll-modal-side__title">Поделиться</div>
              <div class="social social_colored js-social" data-url="${item.share.url}" data-title="${item.share.title}" data-description="${item.share.description}" data-image="${item.share.image}">
                <a class="button-animate button-animate_inverted_bg social__link social__link_facebook" href="#" data-id="fb"><svg fill="#39579f" width="9" height="16">
                    <use xlink:href="#icon-facebook"></use>
                  </svg></a>
                <a class="button-animate button-animate_inverted_bg social__link social__link_twitter" href="#" data-id="tw"><svg fill="#1da1f2" width="17" height="14">
                    <use xlink:href="#icon-twitter"></use>
                  </svg></a>
                <a class="button-animate button-animate_inverted_bg social__link social__link_vkontakte" href="#" data-id="vk"><svg fill="#5181b8" width="21" height="12">
                    <use xlink:href="#icon-vkontakte"></use>
                  </svg></a>
                <a class="button-animate button-animate_inverted_bg social__link social__link_odnoklassniki" href="#" data-id="ok"><svg fill="#ef7d01" width="16" height="16">
                    <use xlink:href="#icon-odnoklassniki"></use>
                  </svg></a>
              </div>
          </div>
  `
  }
  [].forEach.call(links, link => {
    link.classList.add('inited');
    link.addEventListener('click', () => {
      let slidesStr = '';
      const data = JSON.parse(link.parentNode.dataset.modal)

      data.imgs.forEach((item, i) => {
        slidesStr += `<div class="coll-modal-slider__item"><img src="${item}" alt=""></div>`
      });
      const content = `
        <div class="coll-modal-wrapper">
          <div class="coll-modal-side">
            <div class="button button-dark coll-modal-side__link"><span></span></div>
            <div class="coll-modal-side__inner">
              ${generateSideHtml(data)}
            </div>
          </div>
        <div class="coll-modal-slider">
          <div class="slider-sett">
            <div class="slider-counter">
              <div class="slider-counter__1">1</div>/
              <div class="slider-counter__2">${data.imgs.length}</div>
            </div>
          </div>
          <div class="coll-modal-slider__slides">${slidesStr}</div>
        </div>
        </div>
      `;

      const modal = new tingle.modal({
          closeMethods: ['button', 'escape'],
          cssClass: ['modal-full'],
          onOpen: () => {
            const modalContent = modal.getContent();
            const sliderContainer = modalContent.querySelector('.coll-modal-slider');
            const slidesContainer = sliderContainer.querySelector('.coll-modal-slider__slides');
            slidesContainer.style.height = window.innerHeight + 'px';
            // console.log(modal.getContent().querySelector('.stores-modal-slider__slides'));
            // console.log(slidesContainer);
            const itemsWidth = slidesContainer.children[0].offsetWidth;
            const slider = tns({
              container: slidesContainer,
              // startIndex: sliderStartIndex,
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
            const side = modalContent.querySelector('.coll-modal-side')
            const sideLink = side.querySelector('.coll-modal-side__link')
            sideLink.addEventListener('click', () => {
              modal.modal.classList.toggle('is-side-active')
            });
            if (isHistoryApiAvailable() && data.url !== undefined && data.url !== window.location) {
                window.history.pushState(null, data.art, data.url);
                document.title = data.art;
            }
          },
          onClose: () => {
            if (isHistoryApiAvailable() && page_data.url !== undefined && page_data.url !== window.location) {
              window.history.pushState(null, page_data.title, page_data.url);
              document.title = page_data.title;
            }
          }
      });
      modal.setContent(content);
      modal.open();
      animatedHoverButton();
      modalShare();
    })
  })
}
modalCollection();

function isHistoryApiAvailable() {
  return !!(window.history && history.pushState);
}

export default modalCollection;