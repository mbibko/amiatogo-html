;(() => {
	const els = document.querySelectorAll('.toggler');
	if(!els) return;
	[].forEach.call(els, el => {
		const link = el.querySelector('.toggler__link');
		const content = el.querySelector('.toggler__content');
		content.style.setProperty('--max-height', content.scrollHeight + 'px')
		link.addEventListener('click', () => {
			el.classList.toggle('is-active')
		});
	});
})();