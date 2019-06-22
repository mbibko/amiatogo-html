const container = document.querySelector('.join-offset')
const footer = document.querySelector('.footer')
if(container) {
	container.style.setProperty('--offset', footer.offsetHeight + 'px')
}