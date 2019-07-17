import showAnimate from '../showAnimate/showAnimate'
import ajaxLoad from '../../js/ajaxLoad'
import modalCollection from "../modalCollection/modalCollection";
import animatedHoverButton from "../animatedHoverButton/animatedHoverButton";

if(SITE == 'false') {
  const loadMoreCollItems = () => {
    const items = document.querySelector('.collectionItems')
    if(!items) return;
    const itemsMoreLink = items.querySelector('.js-cool-items-more')
    const itemsItems = items.querySelector('.collectionItems__inner')
    if (!itemsMoreLink) return;
    itemsMoreLink.addEventListener('click', () => {
      fetch('data-coll-items.html')
        .then(function (response) {
          return response.text()
        })
        .then(function (text) {
          itemsItems.insertAdjacentHTML('beforeend', text);
          showAnimate();
          modalCollection();
        })
      // .catch( alert );
    })
  }
  loadMoreCollItems()
}

if(SITE == 'true') {
    document.addEventListener('DOMContentLoaded', () => {
      ajaxLoad('.ajax-list-collection', () => {
        showAnimate();
        modalCollection();
        animatedHoverButton();
      });
    }, false);
}
