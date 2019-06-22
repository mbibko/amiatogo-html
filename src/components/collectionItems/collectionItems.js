import showAnimate from '../showAnimate/showAnimate'

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
        showAnimate()
      })
    // .catch( alert );
  })
}
loadMoreCollItems()