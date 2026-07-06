// منع النقر بزر الفأرة الأيمن
document.addEventListener('contextmenu', e => e.preventDefault());

// منع اختصارات المطورين
document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) return false;
};

// حماية بسيطة ضد تلاعب الكونسول
(function() {
    const devtools = /./;
    devtools.toString = function() { this.opened = true; }
    console.log('%c', devtools);
})();
