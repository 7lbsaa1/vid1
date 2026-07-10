/* js/app.js - Global Application Initializer */

document.addEventListener('DOMContentLoaded', () => {
    // 1. التأكد من تطبيق الثيم المظلم بشكل افتراضي وثابت
    if (!document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // 2. التحقق من وجود مشغل الفيديو في الصفحة الحالية قبل البدء
    const playerContainer = document.getElementById('player-container');
    const iframeContainer = document.getElementById('yt-iframe');

    if (playerContainer && iframeContainer) {
        console.log("🔒 تم اكتشاف المشغل الآمن بنجاح. جاري تهيئة الإعدادات المتطورة...");
        
        // 3. تأمين المشغل وإزالة شاشة التحميل (Skeleton) بمجرد جاهزية المنظومة
        playerContainer.classList.remove('skeleton-loading');
        
        // 4. في حال تأخر تحميل API يوتيوب لأي سبب، نقوم بمحاولة استدعاء التشغيل يدوياً بأمان
        if (typeof ytPlayer !== 'undefined' && typeof Controls !== 'undefined') {
            if (ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
                Controls.init();
                Keyboard.init();
            }
        }
    } else {
        // نحن الآن في الصفحة الرئيسية (الفهرس / لوحة التحكم)
        console.log("🏫 مرحباً بك في منصة حلبسة الرقمية - الصفحة الرئيسية جاهزة.");
    }
});

// 5. معالجة الأخطاء غير المتوقعة بشكل صامت لمنع توقف أداء المشغل
window.addEventListener('error', (e) => {
    // تجاهل أخطاء يوتيوب الداخلية الشائعة التي لا تؤثر على عمل المشغل الخاص بنا
    if (e.message && (e.message.includes('YouTube') || e.message.includes('iframe'))) {
        return true; 
    }
    console.warn("إشعار داخلي للمشغل:", e.message);
});
