const Keyboard = {
    init: () => {
        document.addEventListener('keydown', (e) => {
            // تجاهل إذا كان المستخدم يكتب في حقل نصي
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

            switch(e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    Controls.togglePlay();
                    break;
                case 'm':
                    document.getElementById('mute-btn').click();
                    break;
                case 'f':
                    document.getElementById('fullscreen-btn').click();
                    break;
                case 'arrowright':
                    ytPlayer.seekTo(ytPlayer.getCurrentTime() + 10);
                    break;
                case 'arrowleft':
                    ytPlayer.seekTo(ytPlayer.getCurrentTime() - 10);
                    break;
            }
        });
    }
};
