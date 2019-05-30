export function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export function setContainerHeight(container) {
  const setHeight = (el) => {
    if (!el) return;
    el.style.height = window.innerHeight + 'px';

  }
  setHeight(container);

  window.addEventListener("resize", function () {
    setHeight(container);
  })
}

export const windowSidesResize = {
  oldWWidth: window.innerWidth,
  oldWHeight: window.innerHeight,
  updateOldSizes: function () {
    this.oldWWidth = window.innerWidth;
    this.oldWHeight = window.innerHeight;
  },
  check: function () {
    if ((this.oldWWidth != window.innerWidth) && (this.oldWHeight != window.innerHeight)) {
      this.updateOldSizes();
      return true
    } else {
      this.updateOldSizes();
      return false
    }
  }
}

export function checkVisible(el, threshold, mode) {
  threshold = threshold || 0;
  mode = mode || 'visible';

  var rect = el.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var above = rect.bottom - threshold < 0;
  var below = rect.top - viewHeight + threshold >= 0;

  return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
}

export const sxsw = {

  full_bleed: function (browserWidth, browserHeight, videoWidth, videoHeight) {

    // Calculate new height and width...
    var ratio = videoHeight / videoWidth;

    videoWidth = browserWidth;
    videoHeight = browserWidth * ratio;

    // If the video is not the right height, then make it so...  
    if (videoHeight < browserHeight) {
      videoHeight = browserHeight;
      videoWidth = videoHeight / ratio;
    }

    return {
      width: videoWidth,
      height: videoHeight
    };

  },

  init: function (video, videoWidth, videoHeight) {
    var new_size = sxsw.full_bleed(window.innerWidth, window.innerHeight, videoWidth, videoHeight);

    video.style.width = new_size.width + 'px';
    video.style.height = new_size.height + 'px';
  }

};


export function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function(){
      if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval); 
  },15);
}