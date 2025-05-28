// noinspection JSIgnoredPromiseFromCall

let currentAudio = null;
let currentTitle = '';
let startTime = null;
let interval = null;
let onTick = () => {
};
let lastReportedMinute = 0;
const timeListeners = [];

export function playAudio(title, audioSrc, tickHandler) {
    stopAudio();

    currentTitle = title;
    currentAudio = new Audio(audioSrc);
    currentAudio.loop = true;
    currentAudio.play().catch(e => console.error('Playback error:', e));

    startTime = Date.now();
    lastReportedMinute = 0;
    onTick = tickHandler;

    interval = setInterval(() => {
        const minutes = getCurrentMinutes();
        timeListeners.forEach(fn => fn(minutes));

        if (minutes > lastReportedMinute) {
            onTick(1); // 1 реальная минута = 1 минута
            lastReportedMinute = minutes;
        }
    }, 5000); // Проверка каждые 5 секунд
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
    lastReportedMinute = 0;
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
        lastReportedMinute = getCurrentMinutes();

        interval = setInterval(() => {
            const minutes = getCurrentMinutes();
            timeListeners.forEach(fn => fn(minutes));

            if (minutes > lastReportedMinute) {
                onTick(1);
                lastReportedMinute = minutes;
            }
        }, 5000);

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
