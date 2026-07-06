// حماية الواجهة ومنع النسخ والتحديد
(function initSecurity() {
    // منع النقر الأيمن
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // منع السحب والإفلات
    document.addEventListener('dragstart', e => e.preventDefault());
    
    // تعطيل اختصارات لوحة المفاتيح لأدوات المطور
    document.addEventListener('keydown', e => {
        if (
            e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
            (e.ctrlKey && e.keyCode === 85) // Ctrl+U
        ) {
            e.preventDefault();
        }
    });

    // رسالة تحذيرية في الكونسول
    console.log("%cتوقف!", "color: red; font-size: 50px; font-weight: bold; -webkit-text-stroke: 1px black;");
    console.log("%cهذه الميزة مخصصة للمطورين. أي محاولة للتلاعب ستؤدي إلى حظر حسابك.", "font-size: 16px;");
})();
