// نقطة البداية، التهيئة الأساسية للمشروع يتم استدعاؤها بمجرد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // الواجهة تعتمد على API يوتيوب الذي يستدعي onYouTubeIframeAPIReady تلقائياً
    // يمكن هنا إضافة إعدادات إضافية كتحميل الـ Themes بناءً على تفضيل النظام
    const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLightMode) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});
