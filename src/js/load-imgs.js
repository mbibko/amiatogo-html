const loadImages = () => {
  const lazies = document.querySelectorAll('.lazy-img');
  [].forEach.call(lazies, img => {
    img.setAttribute('src', img.getAttribute('data-src'))
  })
}

if (document.body.classList.contains('has-loader')) {
  addEventListener('page-ready', loadImages);
} else {
  loadImages()
}
