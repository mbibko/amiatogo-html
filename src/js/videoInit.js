import { sxsw } from './helpers'

const topVideoFunc = () => {

    const topVideo = document.querySelector('.top-video video');
    if(!topVideo) return;

    const setVideoSize = () => {
      topVideo.style.height = 'auto'
      topVideo.style.width = document.body.offsetWidth + 'px'
      if(topVideo.offsetHeight < window.innerHeight) {
        topVideo.style.height = window.innerHeight + 'px'
        topVideo.style.width = 'auto'
      }
    }

    topVideo.addEventListener('playing', () => {
      setVideoSize()
      console.log('Video playing!')
    });

    topVideo.addEventListener('page-ready', () => {
      topVideo.currentTime = 0;
    });
    topVideo.addEventListener('ended', () => {
      topVideo.currentTime = 0;
      topVideo.play()
    });
    window.addEventListener("resize", function () {
      setTimeout(function () {
        setVideoSize()
      }, 50)
    });

}
topVideoFunc()