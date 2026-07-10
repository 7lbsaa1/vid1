/* js/keyboard.js - Professional Keyboard Shortcuts */

const Keyboard = {
    init: () => {
        document.addEventListener('keydown', (e) => {
            // منع تنفيذ الاختصارات إذا كان المستخدم يكتب في مربع نص (للاحتياط مستقبلاً)
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // التأكد من أن المشغل جاهز للعمل
            if (!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') return;

            // إظهار شريط التحكم السُفلي فوراً عند استخدام الكيبورد
            if (typeof Controls !== 'undefined' && typeof Controls.resetControlsTimer === 'function') {
                Controls.resetControlsTimer();
            }

            switch(e.key.toLowerCase()) {
                // 1. التشغيل والإيقاف (مسطرة أو حرف K)
                case ' ':
                case 'k':
                    e.preventDefault(); // منع نزول الصفحة لأسفل عند ضغط المسطرة
                    const playBtn = document.getElementById('play-pause-btn');
                    if (playBtn) playBtn.click(); // استدعاء ضغطة الزر لتحديث الأيقونات (SVG)
                    break;

                // 2. ملء الشاشة (حرف F)
                case 'f':
                    e.preventDefault();
                    const fsBtn = document.getElementById('fullscreen-btn');
                    if (fsBtn) fsBtn.click();
                    break;

                // 3. كتم وإرجاع الصوت (حرف M)
                case 'm':
                    e.preventDefault();
                    const muteBtn = document.getElementById('mute-btn');
                    if (muteBtn) muteBtn.click();
                    break;

                // 4. وضع المسرح (حرف T)
                case 't':
                    e.preventDefault();
                    const theaterBtn = document.getElementById('theater-btn');
                    if (theaterBtn) theaterBtn.click();
                    break;

                // 5. التقديم 10 ثوانٍ (السهم يمين أو حرف L)
                case 'arrowright':
                case 'l':
                    e.preventDefault();
                    ytPlayer.seekTo(ytPlayer.getCurrentTime() + 10, true);
                    if (typeof Controls !== 'undefined' && typeof Controls.updateProgressBar === 'function') {
                        Controls.updateProgressBar();
                    }
                    break;

                // 6. التأخير 10 ثوانٍ (السهم يسار أو حرف J)
                case 'arrowleft':
                case 'j':
                    e.preventDefault();
                    ytPlayer.seekTo(ytPlayer.getCurrentTime() - 10, true);
                    if (typeof Controls !== 'undefined' && typeof Controls.updateProgressBar === 'function') {
                        Controls.updateProgressBar();
                    }
                    break;

                // 7. رفع الصوت 10% (السهم لأعلى)
                case 'arrowup':
                    e.preventDefault();
                    let currentVolUp = ytPlayer.getVolume();
                    let newVolUp = Math.min(currentVolUp + 10, 100); // لا يتخطى 100
                    ytPlayer.setVolume(newVolUp);
                    if (ytPlayer.isMuted()) ytPlayer.unMute();
                    updateVolumeUI(newVolUp);
                    break;

                // 8. خفض الصوت 10% (السهم لأسفل)
                case 'arrowdown':
                    e.preventDefault();
                    let currentVolDown = ytPlayer.getVolume();
                    let newVolDown = Math.max(currentVolDown - 10, 0); // لا يقل عن صفر
                    ytPlayer.setVolume(newVolDown);
                    updateVolumeUI(newVolDown);
                    break;
            }
        });

        // دالة مساعدة لتحديث شكل شريط الصوت وأيقونة الكتم عند استخدام الأسهم
        function updateVolumeUI(vol) {
            const volSlider = document.getElementById('volume-slider');
            const muteBtn = document.getElementById('mute-btn');
            
            if (volSlider) volSlider.value = vol;
            
            if (muteBtn && typeof Icons !== 'undefined') {
                if (vol === 0 || ytPlayer.isMuted()) {
                    muteBtn.innerHTML = Icons.volumeMuted;
                } else {
                    muteBtn.innerHTML = Icons.volumeHigh;
                }
            }
        }
    }
};
