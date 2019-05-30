export default function () {
  if(!document.querySelector('.page-loader')) return;
  document.body.classList.add('page-loading')
  setTimeout(() => {
    document.body.classList.add('page-ready')
    window.dispatchEvent(new CustomEvent('page-ready'));
    setTimeout(() => {
      document.body.classList.add('page-transition-ended')
      document.body.classList.remove('page-loading')

      window.dispatchEvent(new CustomEvent('page-transition-ended'));
    }, 2000);
  }, 3000);
}