/* js/player.js - Core YouTube API Integration & State Management */

let ytPlayer;
let updateInterval;

/**
 * الدالة الأساسية التي يستدعيها يوتيوب تلقائياً فور جاهزية المكتبة الخارجية
 */
function onYouTubeIframeAPIReady() {
    // 1. إظهار شاشة التحميل فوراً لبدء بناء المشغل
    if (typeof Loader !== 'undefined') {
        Loader.show();
    }
    
    // 2. جلب معرف الفيديو الديناميكي المحدد في صفحة الـ HTML
    const currentVideoId = window.CUSTOM_VIDEO_ID || 'sp4yamTUNrw';

    // 3. إنشاء مشغل يوتيوب المخفي وربطه بالحاوية
    ytPlayer = new YT.Player('yt-iframe', {
        host: 'https://www.youtube-nocookie.com', // زيادة الأمان ومنع ملفات تعريف الارتباط الخارجية
        videoId: currentVideoId,
        playerVars: {
            'playsinline': 1,      // التشغيل داخل الصفحة مباشرة على الهواتف دون فتح المشغل الافتراضي
            'controls': 0,         // إخفاء أزرار تحكم يوتيوب الافتراضية تماماً
            'rel': 0,              // منع إظهار فيديوهات مقترحة من قنوات أخرى عند النهاية
            'modestbranding': 1,   // تقليل ظهور لوجو يوتيوب لأقصى درجة
            'disablekb': 1,        // تعطيل اختصارات كيبورد يوتيوب الافتراضية لتفعيل نظامنا المطور
            'iv_load_policy': 3,   // إخفاء الإعلانات التوضيحية والروابط المزعجة داخل الفيديو
            'fs': 0                // إخفاء زر ملء الشاشة الافتراضي
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

/**
 * يتم استدعاؤها فور اكتمال تحميل الفيديو وجاهزيته للتشغيل
 */
function onPlayerReady() {
    // 1. إخفاء شاشة التحميل وبدء عرض المشغل الزجاجي
    if (typeof Loader !== 'undefined') {
        Loader.hide();
    }
    
    // 2. جلب وقت المشاهدة السابق المخزن لهذا الفيديو وتطبيقه تلقائياً
    let savedTime = 0;
    if (typeof Utils !== 'undefined') {
        savedTime = Utils.getSavedProgress();
    }
    if (savedTime > 0) {
        ytPlayer.seekTo(savedTime, true);
    }
    
    // 3. ضبط الوقت الإجمالي للمحاضرة وتحديث الواجهة
    const durationEl = document.getElementById('duration');
    if (durationEl && typeof Utils !== 'undefined') {
        durationEl.innerText = Utils.formatTime(ytPlayer.getDuration());
    }
    
    // 4. تهيئة عناصر التحكم واختصارات الكيبورد المتقدمة
    if (typeof Controls !== 'undefined' && typeof Controls.init === 'function') {
        Controls.init();
    }
    if (typeof Keyboard !== 'undefined' && typeof Keyboard.init === 'function') {
        Keyboard.init();
    }

    // تحديث مبدئي لشريط التقدم ليعكس الوقت المستعاد
    if (typeof Controls !== 'undefined' && typeof Controls.updateProgressBar === 'function') {
        Controls.updateProgressBar(savedTime);
    }
}

/**
 * مراقبة حالة الفيديو (تشغيل، إيقاف مؤقت، انتهى) وتحديث التصميم بناءً عليها
 */
function onPlayerStateChange(event) {
    const container = document.getElementById('player-container');
    const playBtn = document.getElementById('play-pause-btn');

    if (event.data === YT.PlayerState.PLAYING) {
        // حالة التشغيل: إزالة كلاس التوقف وبدء حركة شريط التقدم
        if (container) container.classList.remove('paused');
        
        // تغيير الأيقونة (ستتحول تلقائياً إلى SVG الـ Pause بفضل كود controls.js)
        if (playBtn) playBtn.innerText = '⏸'; 
        
        startProgressUpdate();
        
        // إعادة ضبط مؤقت إخفاء عناصر التحكم عند الحركة
        if (typeof Controls !== 'undefined' && typeof Controls.resetControlsTimer === 'function') {
            Controls.resetControlsTimer();
        }
    } else {
        // حالة الإيقاف المؤقت أو الانتهاء: إظهار الشريط فوراً ومنع اختفائه
        if (container) {
            container.classList.add('paused');
            container.classList.remove('idle'); // إلغاء وضع الخمول ليبقى الشريط ظاهراً
        }
        
        // تغيير الأيقونة إلى SVG التشغيل
        if (playBtn) playBtn.innerText = '▶';
        
        stopProgressUpdate();
    }
}

/**
 * بدء حلقة التحديث الذكية لشريط التقدم باستخدام الـ Browser Layout Loop
 */
function startProgressUpdate() {
    function update() {
        if (ytPlayer && typeof ytPlayer.getPlayerState === 'function' && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            if (typeof Controls !== 'undefined' && typeof Controls.updateProgressBar === 'function') {
                Controls.updateProgressBar();
            }
            // استدعاء الفريم القادم لمنع أي بطء أو تجميد في الشريط
            updateInterval = requestAnimationFrame(update);
        }
    }
    updateInterval = requestAnimationFrame(update);
}

/**
 * إيقاف حلقة التحديث لتوفير استهلاك موارد الجهاز عند إيقاف الفيديو
 */
function stopProgressUpdate() {
    cancelAnimationFrame(updateInterval);
}
