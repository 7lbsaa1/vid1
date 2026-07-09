/* settings.js - Dynamic Configuration */
const AppSettings = {
    // يبحث عن ID مخصص في الصفحة، وإلا يستخدم فيديو الفيزياء كافتراضي
    videoId: window.CUSTOM_VIDEO_ID || 'sp4yamTUNrw', 
    
    defaultVolume: 100,
    saveProgress: true,
    
    // تخصيص مفتاح الذاكرة لكل فيديو بناءً على الـ ID الخاص به
    storageKey: window.CUSTOM_STORAGE_KEY || 'vid_progress_sp4yamTUNrw'
};
