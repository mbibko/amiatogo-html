const topLineFunc = () => {
  const topLine = document.querySelector('.topLine')
  if(!topLine) return;
  let lastScrollTop = 0;
  
  addEventListener('scroll', e => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop || window.pageYOffset < window.innerHeight) {
      topLine.classList.remove('active')
    } else {
      topLine.classList.add('active')
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
}
topLineFunc()