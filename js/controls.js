/* controls.js */
let hideControlsTimeout;

const Controls = {
    init: () => {
        const playBtn = document.getElementById('play-pause-btn');
        const muteBtn = document.getElementById('mute-btn');
        const volSlider = document.getElementById('volume-slider');
        const speedSelect = document.getElementById('playback-speed');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const progressContainer = document.getElementById('progress-container');
        
        // استهداف الحاوية الرئيسية (تأكد أن الـ ID الخاص بها هو player-container)
        const container = document.getElementById('player-container'); 

        // نظام الإخفاء التلقائي للشريط السُفلي
        const resetControlsTimer = () => {
            container.classList.remove('idle');
            clearTimeout(hideControlsTimeout);
            
            // يبدأ المؤقت فقط إذا كان الفيديو يعمل (Play)
            if (ytPlayer && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                hideControlsTimeout = setTimeout(() => {
                    container.classList.add('idle');
                }, 2500); // يختفي بعد ثانيتين ونصف
            }
        };

        // تفعيل الإخفاء عند تحريك الماوس أو اللمس
        container.addEventListener('mousemove', resetControlsTimer);
        container.addEventListener('click', resetControlsTimer);
        container.addEventListener('touchstart', resetControlsTimer);
        container.addEventListener('mouseleave', () => {
            if (ytPlayer && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                container.classList.add('idle');
            }
        });

        Controls.resetControlsTimer = resetControlsTimer; // نجعلها متاحة للملفات الأخرى

        // تشغيل / إيقاف
        playBtn.addEventListener('click', Controls.togglePlay);
        
        // النقر على الشاشة للتشغيل والإيقاف
        container.addEventListener('click', (e) => {
            if(e.target === container || e.target.classList.contains('custom-controls') === false) {
                Controls.togglePlay();
            }
        });

        // الصوت
        volSlider.addEventListener('input', (e) => {
            ytPlayer.setVolume(Number(e.target.value));
            ytPlayer.unMute();
            muteBtn.innerText = Number(e.target.value) === 0 ? '🔇' : '🔊';
        });

        muteBtn.addEventListener('click', () => {
            if (ytPlayer.isMuted()) {
                ytPlayer.unMute();
                muteBtn.innerText = '🔊';
                volSlider.value = ytPlayer.getVolume();
            } else {
                ytPlayer.mute();
                muteBtn.innerText = '🔇';
                volSlider.value = 0;
            }
        });

        // السرعة
        speedSelect.addEventListener('change', (e) => {
            ytPlayer.setPlaybackRate(parseFloat(e.target.value));
        });

        // الشاشة الكاملة
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                container.requestFullscreen().catch(err => console.log(err));
            } else {
                document.exitFullscreen();
            }
        });

        // النقر على شريط التقدم (أصبح الآن متوافقاً مع LTR بشكل صحيح)
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / progressContainer.offsetWidth;
            const newTime = pos * ytPlayer.getDuration();
            ytPlayer.seekTo(newTime);
            Controls.updateProgressBar(newTime);
        });
    },

    togglePlay: () => {
        if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            ytPlayer.pauseVideo();
        } else {
            ytPlayer.playVideo();
        }
    },

    updateProgressBar: (manualTime = null) => {
        const currentTime = manualTime !== null ? manualTime : ytPlayer.getCurrentTime();
        const duration = ytPlayer.getDuration();
        const percentage = (currentTime / duration) * 100;
        
        document.getElementById('progress-bar').style.width = `${percentage}%`;
        document.getElementById('progress-thumb').style.left = `${percentage}%`;
        document.getElementById('current-time').innerText = Utils.formatTime(currentTime);
        
        // حفظ التوقيت كل 5 ثوانٍ
        if(Math.floor(currentTime) % 5 === 0) Utils.saveProgress(currentTime);
    }
};
