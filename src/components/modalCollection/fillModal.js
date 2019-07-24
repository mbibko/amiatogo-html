import tingle from "tingle.js";
import slider from "./slider";
import sideToggle from "./sideToggle";
import animatedHoverButton from "../animatedHoverButton/animatedHoverButton";
import modalShare from "./modalShare";
import { isHistoryApiAvailable } from '../../js/helpers';

const fillModal = (data) => {
    const page_data = window.page_data || {};
    let slidesStr = '';

    data.imgs.forEach((item, i) => {
        slidesStr += `
          <div class="coll-modal-slider__item swiper-slide">
            <img
              srcset="${item.srcset}"
              src="${item.src}"
              alt="">
          </div>`
    });
    const generateSideHtml = item => {
        return `
          <div class="coll-modal-side__top">
              <div class="coll-modal-side__item">
                <div class="coll-modal-side__title">Артикул</div>
                <div class="coll-modal-side__subtitle">${item.art}</div>
              </div>
              <a href="${item.section_url}" class="coll-modal-side__item coll-modal-side__item_full">
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
              <div class="social social_block social_${item.theme == 'dark' ? 'colored' : ''} js-social" data-url="${item.share.url}" data-title="${item.share.title}" data-description="${item.share.description}" data-image="${item.share.image}">
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_facebook" data-id="fb" href="#"><svg width="9" height="16">
                    <use xlink:href="#icon-facebook"></use>
                  </svg></a>
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_twitter" href="#" data-id="tw"><svg fill="#1da1f2" width="17" height="14">
                    <use xlink:href="#icon-twitter"></use>
                  </svg></a>
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_vkontakte" href="#" data-id="vk"><svg width="21" height="12">
                    <use xlink:href="#icon-vkontakte"></use>
                  </svg></a>
                <a class="block-animate ${item.theme == 'dark' ? 'block-animate_inverted_bg' : 'button-white'} social__link social__link_odnoklassniki" href="#" data-id="ok"><svg width="16" height="16">
                    <use xlink:href="#icon-odnoklassniki"></use>
                  </svg></a>
              </div>
          </div>
  `
    };
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

    global.modal = new tingle.modal({
        closeMethods: ['button', 'escape'],
        cssClass: ['modal-full'],
        onOpen: () => {
            const modalContent = modal.getContent();
            const sliderContainer = modalContent.querySelector('.coll-modal-slider');

            modal.modal.addEventListener('scroll', () => {
              sliderContainer.style.transform = `translateY(${modal.modal.scrollTop}px)`
            });
            slider(sliderContainer);
            sideToggle(modal.modal)

            if (
                isHistoryApiAvailable()
                && data.url !== undefined
                && data.url !== window.location
                && data.navigation !== true
            ) {
                window.history.pushState(Object.assign(data, {catalog_modal: true}), data.art, data.url);
            }
            document.title = data.art;
        },
        onClose: () => {
            if (
                isHistoryApiAvailable()
                && page_data.url !== undefined
                && page_data.url !== window.location
                && data.navigation !== true
            ) {
                window.history.pushState(null, page_data.title, page_data.url);
            }
            document.title = page_data.title;
        }
    });
    modal.setContent(content);
    modal.open();
    animatedHoverButton();
    modalShare();
};
export default fillModal;