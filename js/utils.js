/* js/utils.js - Dynamic & Clean Progress Tracker */

const Utils = {
    /**
     * تحويل الثواني إلى صيغة وقت مقروءة (HH:MM:SS أو MM:SS)
     * @param {number} secs - الوقت بالثواني
     * @returns {string} الوقت المنسق
     */
    formatTime: (secs) => {
        if (isNaN(secs) || secs < 0) return "00:00";
        
        const seconds = Math.floor(secs % 60);
        const minutes = Math.floor((secs / 60) % 60);
        const hours = Math.floor(secs / 3600);

        const pad = (num) => String(num).padStart(2, '0');

        if (hours > 0) {
            return `${hours}:${pad(minutes)}:${pad(seconds)}`;
        }
        return `${pad(minutes)}:${pad(seconds)}`;
    },

    /**
     * حفظ تقدم المشاهدة الحالي في الذاكرة المحلية (LocalStorage) لكل فيديو بشكل منفصل
     * @param {number} currentTime - الوقت الحالي بالثواني
     */
    saveProgress: (currentTime) => {
        if (!currentTime || isNaN(currentTime)) return;
        
        // جلب المفتاح الخاص بالفيديو المفتوح حالياً، أو استخدام مفتاح افتراضي
        const storageKey = window.CUSTOM_STORAGE_KEY || 'vid_progress_default';
        
        try {
            localStorage.setItem(storageKey, currentTime.toFixed(2));
        } catch (error) {
            console.error("خطأ أثناء حفظ تقدم المشاهدة:", error);
        }
    },

    /**
     * جلب تقدم المشاهدة المحفوظ سابقاً للفيديو الحالي
     * @returns {number} الوقت المحفوظ بالثواني، أو 0 إذا لم يوجد
     */
    getSavedProgress: () => {
        const storageKey = window.CUSTOM_STORAGE_KEY || 'vid_progress_default';
        
        try {
            const savedTime = localStorage.getItem(storageKey);
            return savedTime ? parseFloat(savedTime) : 0;
        } catch (error) {
            console.error("خطأ أثناء جلب تقدم المشاهدة:", error);
            return 0;
        }
    },

    /**
     * مسح تقدم المشاهدة الخاص بالفيديو الحالي عند الحاجة
     */
    clearProgress: () => {
        const storageKey = window.CUSTOM_STORAGE_KEY || 'vid_progress_default';
        try {
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error("خطأ أثناء مسح الذاكرة:", error);
        }
    }
};
