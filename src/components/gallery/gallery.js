import showAnimate from '../showAnimate/showAnimate'

const loadMoreGalleryItems = () => {
  const gallery = document.querySelector('.gallery')
  if(!gallery) return;
  const galleryMoreLink = gallery.querySelector('.js-gallery-more')
  const galleryItems = gallery.querySelector('.gallery__items-inner')
  if (!galleryMoreLink) return;
  galleryMoreLink.addEventListener('click', () => {
    fetch('data-gallery-items.html')
      .then(function (response) {
        // console.log(response)
        return response.text()
      })
      .then(function (text) {
        // console.log(text)
        galleryItems.insertAdjacentHTML('beforeend', text);
        showAnimate()
      })
    // .catch( alert );
  })

  if(window.innerWidth <= 1280) {
    [].forEach.call(document.querySelectorAll('.gallery__item:nth-child(n+7)'), item => {
      item.parentNode.removeChild(item)
    })
  }
}
loadMoreGalleryItems()