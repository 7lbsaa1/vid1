let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'YOUR_VIDEO_ID',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'rel': 0,
            'modestbranding': 1,
            'disablekb': 1,
            'iv_load_policy': 3
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}
// التحكم المخصص يرسل الأوامر لـ player.playVideo() أو player.pauseVideo()
