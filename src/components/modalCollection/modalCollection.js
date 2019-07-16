import fillModal from './fillModal.js';

const modalCollection = () => {
  const links = document.querySelectorAll('.js-cool-modal:not(.inited)');
  if(!links) return;
  [].forEach.call(links, link => {
    link.classList.add('inited');
    link.addEventListener('click', () => {
      const data = JSON.parse(link.parentNode.dataset.modal);

      fillModal(data);
    })
  })
};
modalCollection();

window.addEventListener('popstate', function(event){
    if (event.state && event.state.catalog_modal !== false) {
      event.state.navigation = true;
      fillModal(event.state);
    } else if(typeof modal === "object") {
      modal.close();
    }
}, false);

export default modalCollection;