if(document.querySelector('.mobileMenu-link')) {

document.querySelector('.mobileMenu__close').addEventListener('click', () => {
  document.body.classList.remove('is-mobile-menu-open')
});

document.querySelector('.mobileMenu-link').addEventListener('click', () => {
  document.body.classList.add('is-mobile-menu-open')
});
}