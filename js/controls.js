/* controls.js - Linter Friendly */
const Controls = {
    init: () => {
        const playBtn = document.getElementById('play-pause-btn');
        const muteBtn = document.getElementById('mute-btn');
        const volSlider = document.getElementById('volume-slider');
        const speedSelect = document.getElementById('playback-speed');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const progressContainer = document.getElementById('progress-container');
        const container = document.getElementById('player-container');

        // Play / Pause
        playBtn.addEventListener('click', Controls.togglePlay);
        
        // Click on screen to play/pause
        container.addEventListener('click', (e) => {
            if(e.target === container || e.target.classList.contains('custom-controls') === false) {
                Controls.togglePlay();
            }
        });

        // Volume
        volSlider.addEventListener('input', (e) => {
            ytPlayer.setVolume(Number(e.target.value));
            ytPlayer.unMute();
            // استخدام === مع تحويل القيمة لرقم
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

        // Speed
        speedSelect.addEventListener('change', (e) => {
            ytPlayer.setPlaybackRate(parseFloat(e.target.value));
        });

        // Fullscreen
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                container.requestFullscreen().catch(err => console.log(err));
            } else {
                document.exitFullscreen();
            }
        });

        // Progress Bar Click
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
        
        // Save state occasionally
        if(Math.floor(currentTime) % 5 === 0) Utils.saveProgress(currentTime);
    }
};
