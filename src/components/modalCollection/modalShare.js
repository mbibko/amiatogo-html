const modalShare = () => {
    const container = document.querySelectorAll('.js-social');
    if (!container) return;

    const config = {
        title: 'Поделиться',
        width: 600,
        height: 400,
    };

    container.forEach((block) => {
        let url = encodeURIComponent(block.dataset.url) || location.href,
            title = encodeURIComponent(block.dataset.title) || '',
            description = encodeURIComponent(block.dataset.description) || '',
            image = encodeURIComponent(block.dataset.image) || '';

        [].forEach.call(block.querySelectorAll('a'), item => {
            let id = item.dataset.id;
            if (!id) return;

            item.addEventListener('click', (e) => {
                e.preventDefault();
                switch (id) {
                    case 'fb':
                        popupCenter('https://www.facebook.com/sharer.php?s=100&p[url]=' + url + '&p[images][0]=' + image + '&p[title]=' + title + '&p[summary]=' + description, config.title, config.width, config.height);
                        break;
                    case 'vk':
                        popupCenter('https://vk.com/share.php?url=' + url + '&title=' + title + '&description=' + description + '&image=' + image + '&noparse=true', config.title, config.width, config.height);
                        break;
                    case 'tw':
                        let text = title || '';
                        if (title.length > 0 && description.length > 0) {
                            text = title + ' — ' + description;
                        }
                        popupCenter('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, config.title, config.width, config.height);
                        break;
                    case 'ok':
                        popupCenter('https://connect.ok.ru/offer?url=' + url + '&title=' + title + '&imageUrl=' + image, config.title, config.width, config.height);
                        break;
                }
            });
        });
    });

    const popupCenter = (url, title, w, h) => {
        let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        let dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
        let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        let left = ((width / 2) - (w / 2)) + dualScreenLeft;
        let top = ((height / 3) - (h / 3)) + dualScreenTop;
        let newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        if (window.focus) {
            newWindow.focus();
        }
    }
};
export default modalShare
