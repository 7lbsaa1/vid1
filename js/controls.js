/* js/controls.js - Premium SVG Icons & Advanced Features */

let hideControlsTimeout;

// 1. مكتبة الأيقونات الاحترافية (SVG Vector Icons)
const Icons = {
    play: '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
    volumeHigh: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
    volumeMuted: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
    exitFullscreen: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>',
    pip: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/></svg>',
    theater: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/></svg>'
};

const Controls = {
    init: () => {
        const playBtn = document.getElementById('play-pause-btn');
        const muteBtn = document.getElementById('mute-btn');
        const volSlider = document.getElementById('volume-slider');
        const speedSelect = document.getElementById('playback-speed');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const theaterBtn = document.getElementById('theater-btn');
        const pipBtn = document.getElementById('pip-btn');
        const progressContainer = document.getElementById('progress-container');
        const container = document.getElementById('player-container'); 

        // 2. تعيين الأيقونات الحقيقية للأزرار فوراً عند التحميل
        if (playBtn) playBtn.innerHTML = Icons.play;
        if (muteBtn) muteBtn.innerHTML = Icons.volumeHigh;
        if (fullscreenBtn) fullscreenBtn.innerHTML = Icons.fullscreen;
        if (theaterBtn) theaterBtn.innerHTML = Icons.theater;
        if (pipBtn) pipBtn.innerHTML = Icons.pip;

        // 3. [خدعة برمجية] لمنع ملف player.js من مسح الأيقونة وإعادة الإيموجي
        if (playBtn) {
            const originalSetText = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText');
            Object.defineProperty(playBtn, 'innerText', {
                set: function(value) {
                    if (value === '⏸') this.innerHTML = Icons.pause;
                    else if (value === '▶') this.innerHTML = Icons.play;
                    else originalSetText.set.call(this, value);
                }
            });
        }

        // 4. نظام الإخفاء التلقائي للشريط السُفلي (وضع الخمول)
        const resetControlsTimer = () => {
            if (!container) return;
            container.classList.remove('idle');
            clearTimeout(hideControlsTimeout);
            
            if (ytPlayer && typeof ytPlayer.getPlayerState === 'function' && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                hideControlsTimeout = setTimeout(() => {
                    container.classList.add('idle');
                }, 2500); 
            }
        };

        if (container) {
            container.addEventListener('mousemove', resetControlsTimer);
            container.addEventListener('click', resetControlsTimer);
            container.addEventListener('touchstart', resetControlsTimer);
            container.addEventListener('mouseleave', () => {
                if (ytPlayer && typeof ytPlayer.getPlayerState === 'function' && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                    container.classList.add('idle');
                }
            });
        }

        Controls.resetControlsTimer = resetControlsTimer;

        // 5. أزرار التشغيل والإيقاف
        const togglePlayState = () => {
            if (ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
                if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                    ytPlayer.pauseVideo();
                    if(playBtn) playBtn.innerHTML = Icons.play;
                } else {
                    ytPlayer.playVideo();
                    if(playBtn) playBtn.innerHTML = Icons.pause;
                }
            }
        };

        if(playBtn) playBtn.addEventListener('click', togglePlayState);
        
        if (container) {
            container.addEventListener('click', (e) => {
                // منع تشغيل الفيديو عند الضغط على الشريط السفلي
                if(e.target === container || (!e.target.closest('.custom-controls') && !e.target.closest('.control-btn'))) {
                    togglePlayState();
                }
            });
        }

        // 6. التحكم بالصوت والأيقونات الخاصة به ديناميكياً
        if(volSlider) {
            volSlider.addEventListener('input', (e) => {
                const vol = Number(e.target.value);
                ytPlayer.setVolume(vol);
                if (vol > 0 && ytPlayer.isMuted()) ytPlayer.unMute();
                
                if(muteBtn) muteBtn.innerHTML = vol === 0 ? Icons.volumeMuted : Icons.volumeHigh;
            });
        }

        if(muteBtn) {
            muteBtn.addEventListener('click', () => {
                if (ytPlayer.isMuted() || ytPlayer.getVolume() === 0) {
                    ytPlayer.unMute();
                    const restoreVol = volSlider && volSlider.value > 0 ? volSlider.value : 100;
                    ytPlayer.setVolume(restoreVol);
                    muteBtn.innerHTML = Icons.volumeHigh;
                    if(volSlider) volSlider.value = restoreVol;
                } else {
                    ytPlayer.mute();
                    muteBtn.innerHTML = Icons.volumeMuted;
                    if(volSlider) volSlider.value = 0;
                }
            });
        }

        // 7. السرعة
        if(speedSelect) {
            speedSelect.addEventListener('change', (e) => {
                ytPlayer.setPlaybackRate(parseFloat(e.target.value));
            });
        }

        // 8. الشاشة الكاملة
        if(fullscreenBtn && container) {
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    container.requestFullscreen().then(() => {
                        fullscreenBtn.innerHTML = Icons.exitFullscreen;
                    }).catch(err => console.log(err));
                } else {
                    document.exitFullscreen().then(() => {
                        fullscreenBtn.innerHTML = Icons.fullscreen;
                    });
                }
            });

            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    fullscreenBtn.innerHTML = Icons.fullscreen;
                }
            });
        }

        // 9. وضع المسرح (تأثير جمالي)
        if(theaterBtn && container) {
            theaterBtn.addEventListener('click', () => {
                container.classList.toggle('theater-mode');
            });
        }

        // 10. النقر على شريط التقدم
        if(progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / progressContainer.offsetWidth;
                const newTime = pos * ytPlayer.getDuration();
                ytPlayer.seekTo(newTime);
                Controls.updateProgressBar(newTime);
            });
        }
    },

    updateProgressBar: (manualTime = null) => {
        if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
        
        const currentTime = manualTime !== null ? manualTime : ytPlayer.getCurrentTime();
        const duration = ytPlayer.getDuration();
        const percentage = (currentTime / duration) * 100;
        
        const progressBar = document.getElementById('progress-bar');
        const progressThumb = document.getElementById('progress-thumb');
        const currentTimeEl = document.getElementById('current-time');
        
        if(progressBar) progressBar.style.width = `${percentage}%`;
        if(progressThumb) progressThumb.style.left = `${percentage}%`;
        if(currentTimeEl) currentTimeEl.innerText = Utils.formatTime(currentTime);
        
        // حفظ الوقت لضمان الاستكمال
        if(Math.floor(currentTime) % 5 === 0 && typeof Utils !== 'undefined') {
            Utils.saveProgress(currentTime);
        }
    }
};
