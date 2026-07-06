/* player.js - Linter Friendly */
let ytPlayer;
let updateInterval;

// الدالة الأساسية التي يستدعيها يوتيوب تلقائياً
function onYouTubeIframeAPIReady() {
    Loader.show();
    ytPlayer = new YT.Player('yt-iframe', {
        host: 'https://www.youtube-nocookie.com',
        videoId: AppSettings.videoId,
        playerVars: {
            'playsinline': 1,
            'controls': 0,     // إخفاء تحكم يوتيوب
            'rel': 0,          // منع الفيديوهات المقترحة 
            'modestbranding': 1, 
            'disablekb': 1,    
            'iv_load_policy': 3, 
            'fs': 0,
            'autoplay': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// إزالة المتغير (event) لأنه غير مستخدم لتجنب تحذيرات الـ Linter
function onPlayerReady() {
    Loader.hide();
    const savedTime = Utils.getSavedProgress();
    if (savedTime > 0) {
        ytPlayer.seekTo(savedTime);
    }
    
    document.getElementById('duration').innerText = Utils.formatTime(ytPlayer.getDuration());
    ytPlayer.setVolume(AppSettings.defaultVolume);
    
    Controls.init();
    Keyboard.init();
}

function onPlayerStateChange(event) {
    const container = document.getElementById('player-container');
    const playBtn = document.getElementById('play-pause-btn');

    // استخدام === بدلاً من == لتجنب تحذيرات الفحص
    if (event.data === YT.PlayerState.PLAYING) {
        container.classList.remove('paused');
        playBtn.innerText = '⏸';
        startProgressUpdate();
    } else {
        container.classList.add('paused');
        playBtn.innerText = '▶';
        stopProgressUpdate();
        
        if (event.data === YT.PlayerState.ENDED) {
            alert("انتهى الفيديو، نتمنى لك التوفيق في الامتحان!");
        }
    }
}

function startProgressUpdate() {
    function update() {
        if (ytPlayer && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            Controls.updateProgressBar();
            updateInterval = requestAnimationFrame(update);
        }
    }
    updateInterval = requestAnimationFrame(update);
}

function stopProgressUpdate() {
    cancelAnimationFrame(updateInterval);
}
