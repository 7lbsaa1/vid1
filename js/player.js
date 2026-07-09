/* js/player.js - المطور والآمن */
let ytPlayer;
let updateInterval;

// تأكيد تحميل واجهة API من يوتيوب
function onYouTubeIframeAPIReady() {
    if (typeof Loader !== 'undefined') Loader.show();
    
    // جلب الـ ID الخاص بالفيديو من الذاكرة اللحظية للصفحة
    const currentVideoId = window.CUSTOM_VIDEO_ID || (typeof AppSettings !== 'undefined' ? AppSettings.videoId : 'sp4yamTUNrw');

    ytPlayer = new YT.Player('yt-iframe', {
        host: 'https://www.youtube-nocookie.com',
        videoId: currentVideoId,
        playerVars: {
            'playsinline': 1,
            'controls': 0,     
            'rel': 0,          
            'modestbranding': 1, 
            'disablekb': 1,    
            'iv_load_policy': 3, 
            'fs': 0,
            'autoplay': 1 // جعلناه يشتغل تلقائياً عند الفتح للتجربة
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() {
    if (typeof Loader !== 'undefined') Loader.hide();
    
    // جلب وقت المشاهدة السابق بأمان
    let savedTime = 0;
    if (typeof Utils !== 'undefined' && typeof AppSettings !== 'undefined') {
        savedTime = Utils.getSavedProgress();
    }
    if (savedTime > 0) {
        ytPlayer.seekTo(savedTime);
    }
    
    // ضبط الوقت الإجمالي للفيديو
    const durationEl = document.getElementById('duration');
    if (durationEl && typeof Utils !== 'undefined') {
        durationEl.innerText = Utils.formatTime(ytPlayer.getDuration());
    }
    
    // تشغيل أزرار التحكم والـ Keyboard
    if (typeof Controls !== 'undefined' && typeof Controls.init === 'function') Controls.init();
    if (typeof Keyboard !== 'undefined' && typeof Keyboard.init === 'function') Keyboard.init();
}

function onPlayerStateChange(event) {
    const container = document.getElementById('player-container');
    const playBtn = document.getElementById('play-pause-btn');

    if (event.data === YT.PlayerState.PLAYING) {
        if (container) container.classList.remove('paused');
        if (playBtn) playBtn.innerText = '⏸';
        startProgressUpdate();
        if (typeof Controls !== 'undefined' && Controls.resetControlsTimer) Controls.resetControlsTimer(); 
    } else {
        if (container) {
            container.classList.add('paused');
            container.classList.remove('idle');
        }
        if (playBtn) playBtn.innerText = '▶';
        stopProgressUpdate();
    }
}

function startProgressUpdate() {
    function update() {
        if (ytPlayer && typeof ytPlayer.getPlayerState === 'function' && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            if (typeof Controls !== 'undefined' && typeof Controls.updateProgressBar === 'function') {
                Controls.updateProgressBar();
            }
            updateInterval = requestAnimationFrame(update);
        }
    }
    updateInterval = requestAnimationFrame(update);
}

function stopProgressUpdate() {
    cancelAnimationFrame(updateInterval);
}
