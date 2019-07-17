export default function(container) {
  const side = container.querySelector('.coll-modal-side');
  const sideLink = side.querySelector('.coll-modal-side__link');
  sideLink.addEventListener('click', () => {
      container.classList.toggle('is-side-active')
  });
}
