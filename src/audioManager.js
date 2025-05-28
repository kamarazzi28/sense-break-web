let currentAudio = null;
let currentTitle = '';
let startTime = null;
let onTick = () => {
};
let interval = null;

// подписчики (например AmbientCard)
const timeListeners = [];

export function playAudio(title, audioSrc, tickHandler) {
    stopAudio();

    currentTitle = title;
    currentAudio = new Audio(audioSrc);
    currentAudio.loop = true;
    currentAudio.play().catch(e => {
        console.error('Playback error:', e);
    });

    startTime = Date.now();
    onTick = tickHandler;

    interval = setInterval(() => {
        const minutes = Math.floor((Date.now() - startTime) / 60000);
        timeListeners.forEach(fn => fn(minutes));
    }, 3000); // обновление каждые 3 сек
}

export function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    clearInterval(interval);
    interval = null;
    startTime = null;
    currentTitle = '';
    timeListeners.forEach(fn => fn(0));
}

export function getCurrentTitle() {
    return currentTitle;
}

export function getCurrentMinutes() {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 60000);
}

export function resumeAudioIfNeeded(tickHandler) {
    if (currentAudio && currentTitle) {
        onTick = tickHandler;
        interval = setInterval(() => {
            const minutes = Math.floor((Date.now() - startTime) / 60000);
            timeListeners.forEach(fn => fn(minutes));
        }, 3000);
        return currentTitle;
    }
    return null;
}

export function subscribeToTime(fn) {
    timeListeners.push(fn);
    fn(getCurrentMinutes());
    return () => {
        const idx = timeListeners.indexOf(fn);
        if (idx !== -1) timeListeners.splice(idx, 1);
    };
}
