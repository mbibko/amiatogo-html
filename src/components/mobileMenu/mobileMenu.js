const mobileMenu = document.querySelector('.mobileMenu');
if(mobileMenu) {
    mobileMenu.querySelector('.mobileMenu__close').addEventListener('click', () => {
      document.body.classList.remove('is-mobile-menu-open')
    });

    [].forEach.call(document.querySelectorAll('.mobileMenu-link'), link => {

      link.addEventListener('click', () => {
        document.body.classList.add('is-mobile-menu-open')
      });
    })
}
