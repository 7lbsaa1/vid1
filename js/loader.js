/* js/loader.js - Premium Loading Experience */

const Loader = {
    /**
     * إظهار شاشة التحميل وتفعيل تأثير الـ Skeleton
     */
    show: () => {
        const loaderEl = document.getElementById('loader');
        const container = document.getElementById('player-container');
        
        if (loaderEl) {
            loaderEl.style.display = 'block';
            loaderEl.style.opacity = '1';
            loaderEl.style.transition = 'opacity 0.3s ease';
        }
        
        if (container) {
            container.classList.add('skeleton-loading');
        }
    },

    /**
     * إخفاء شاشة التحميل بنعومة (Fade Out) بعد جاهزية المشغل
     */
    hide: () => {
        const loaderEl = document.getElementById('loader');
        const container = document.getElementById('player-container');

        // إخفاء اللودر بتأثير انتقالي ناعم
        if (loaderEl) {
            loaderEl.style.opacity = '0';
            
            // الانتظار حتى ينتهي تأثير الاختفاء ثم إزالته من العرض تماماً
            setTimeout(() => {
                loaderEl.style.display = 'none';
            }, 300);
        }

        // إزالة تأثير الـ Skeleton من الحاوية الرئيسية
        if (container) {
            container.classList.remove('skeleton-loading');
        }
    }
};
