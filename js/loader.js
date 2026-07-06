const Loader = {
    show: () => {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('player-container').classList.add('skeleton-loading');
    },
    hide: () => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('player-container').classList.remove('skeleton-loading');
    }
};
