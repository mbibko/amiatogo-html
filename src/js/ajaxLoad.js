const ajaxLoad = (selector, callback) => {
    const container = document.querySelectorAll(selector);
    if (!container) return;
    const params = {'AJAX_PAGE': 'Y', 'CONTAINER': 'ajax'};
    const ajaxPagerLoaderClass = 'loading';

    container.forEach((item) => {
        let ajaxPagerWrapClass = '.ajax-pager-wrap';

        if (!ajaxPagerWrapClass) return;

        document.addEventListener('click', (e) => {
            if (e.target && e.target.closest(ajaxPagerWrapClass)) {
                e.preventDefault();

                let ajaxPagerLink = item.querySelector('.ajax-pager-link'),
                    url = new URL(window.location.origin + ajaxPagerLink.dataset.href);
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                item.classList.add(ajaxPagerLoaderClass);

                fetch(url.pathname + url.search, {
                    headers: {'X-Requested-With': 'XMLHttpRequest'}
                }).then(response => response.text())
                .then(function (text) {
                    item.insertAdjacentHTML('beforeend', text);

                    item.removeChild(item.querySelector(ajaxPagerWrapClass));

                    item.classList.remove(ajaxPagerLoaderClass);

                    if (!(callback instanceof Function && typeof callback === 'function')) {
                        return false;
                    }
                    callback();
                });
            }
        });
    });
};
export default ajaxLoad