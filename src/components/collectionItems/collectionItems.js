import showAnimate from '../showAnimate/showAnimate'
import ajaxLoad from '../../js/ajaxLoad'
import modalCollection from "../modalCollection/modalCollection";

document.addEventListener('DOMContentLoaded', () => {
  ajaxLoad('.ajax-list-collection', () => {
    showAnimate();
    modalCollection();
  });
}, false);