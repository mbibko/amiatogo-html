export default function() {
  if (window.innerWidth >= 1200) {
    [].forEach.call(document.querySelectorAll('.button-animate'), item => {
      const hoverWrapper = document.createElement('div')
      const newItem = '<span class="button-animate__inner">'+ item.innerHTML +'</span>'
      hoverWrapper.classList.add('hover-wrapper')
      item.innerHTML = newItem
      hoverWrapper.innerHTML = item.innerHTML;
      item.appendChild(hoverWrapper)
      hoverWrapper.style.setProperty('--width', item.scrollWidth + 2 + 'px')
      
      const itemInner = item.children[0]
      const lettersInner = hoverWrapper.children[0]
      
      lettersInner.style.paddingLeft = itemInner.offsetLeft + 'px'
      lettersInner.style.width = itemInner.offsetWidth + itemInner.offsetLeft + 'px'
      // if(item.classList.contains('link-all')) {
      //   hoverWrapper.querySelector('svg').style.marginLeft = item.scrollWidth - lettersInner.scrollWidth - parseInt(getComputedStyle(item).paddingRight) + 'px'
      // }
      if(item.classList.contains('button-animate_inverted_bg')) {
        item.style.setProperty('--background-color', item.querySelector('svg').getAttribute('fill'))
      }
      window.addEventListener('resize', () => {
        lettersInner.style.paddingLeft = itemInner.offsetLeft + 'px'
        lettersInner.style.width = itemInner.offsetWidth + itemInner.offsetLeft + 'px'
      })
    });
  }
}