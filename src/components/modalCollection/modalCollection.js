import tingle from 'tingle.js'
import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Navigation, Pagination]);
import animatedHoverButton from '../animatedHoverButton/animatedHoverButton.js'

;(function () {
  const links = document.querySelectorAll('.js-cool-modal');
  if(!links) return
  const generateSideHtml = item => {
    return `
          <div class="coll-modal-side__top">
              <div class="coll-modal-side__item">
                <div class="coll-modal-side__title">Артикул</div>
                <div class="coll-modal-side__subtitle">Арт. SP - ${item.art}</div>
              </div>
              <a href="${item.url}" class="coll-modal-side__item coll-modal-side__item_full">
                <div class="coll-modal-side__title">Коллекция</div>
                <div class="coll-modal-side__subtitle coll-modal-side__subtitle_underline">${item.collection}</div>
              </a>
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
              <div class="social social_block social_${item.theme == 'dark' ? 'colored' : ''}">
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_facebook" href="${item.shares.facebook}"><svg width="9" height="16">
                    <use xlink:href="#icon-facebook"></use>
                  </svg></a>
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_twitter" href="${item.shares.twitter}"><svg width="17" height="14">
                    <use xlink:href="#icon-twitter"></use>
                  </svg></a>
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_vkontakte" href="${item.shares.vkontakte}"><svg width="21" height="12">
                    <use xlink:href="#icon-vkontakte"></use>
                  </svg></a>
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_odnoklassniki" href="${item.shares.odnoklassniki}"><svg width="16" height="16">
                    <use xlink:href="#icon-odnoklassniki"></use>
                  </svg></a>
              </div>
          </div>
  `
  }
  [].forEach.call(links, link => {
    link.addEventListener('click', () => {
      let slidesStr = ''
      const data = JSON.parse(link.parentNode.dataset.modal)

      data.imgs.forEach((item, i) => {
        slidesStr += `<div class="coll-modal-slider__item swiper-slide"><img src="${item}" alt=""></div>`
      });
      const content = `
        <div class="coll-modal-wrapper theme_${data.theme}">
          <div class="coll-modal-side">
            <div class="button button-dark coll-modal-side__link"><span></span></div>
            <div class="coll-modal-side__inner">
              <div class="coll-modal-side__inner-inner">
                ${generateSideHtml(data)}
              </div>
            </div>
          </div>
        <div class="coll-modal-slider swiper-container">
          <div class="coll-modal-slider__slides swiper-wrapper">${slidesStr}</div>
          <div class="slider-controls">
            <div class="slider-navigation">
              <div class="slider-button slider-button-prev"></div>
              <div class="slider-button slider-button-next"></div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        </div>
      `;

      const modal = new tingle.modal({
          closeMethods: ['button', 'escape'],
          cssClass: ['modal-full'],
          onOpen: () => {
            const modalContent = modal.getContent()
            const sliderContainer = modalContent.querySelector('.coll-modal-slider')
            const multipleItems = sliderContainer.querySelector('.swiper-wrapper').children.length > 1 ? true : false
            new Swiper(sliderContainer, {
              speed: 1000,
              slidesPerView: multipleItems ? 'auto' : 1,
              loop: multipleItems ? true : false,
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
            const side = modalContent.querySelector('.coll-modal-side')
            const sideLink = side.querySelector('.coll-modal-side__link')
            sideLink.addEventListener('click', () => {
              modal.modal.classList.toggle('is-side-active')
            });
          }
      });
      modal.setContent(content);
      modal.open();
      animatedHoverButton()
  })
  })
}());