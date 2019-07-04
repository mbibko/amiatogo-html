export default function() {
  if (window.innerWidth >= 1200) {
    [].forEach.call(document.querySelectorAll('.block-animate'), item => {
      const hoverWrapper = document.createElement('div')
      const newItem = '<span class="block-animate__inner">'+ item.innerHTML +'</span>'
      hoverWrapper.classList.add('hover-wrapper')
      item.innerHTML = newItem
      hoverWrapper.innerHTML = item.innerHTML;
      item.appendChild(hoverWrapper)
      hoverWrapper.style.setProperty('--width', item.scrollWidth + 2 + 'px')
      
      const itemInner = item.children[0]
      const lettersInner = hoverWrapper.children[0]
      
      lettersInner.style.paddingLeft = itemInner.offsetLeft + 'px'
      lettersInner.style.width = itemInner.offsetWidth + itemInner.offsetLeft + 'px'
      window.addEventListener('resize', () => {
        lettersInner.style.paddingLeft = itemInner.offsetLeft + 'px'
        lettersInner.style.width = itemInner.offsetWidth + itemInner.offsetLeft + 'px'
      })
    });
  }
}