let currentAudio = null;
let currentTitle = '';
let startTime = null;
let interval = null;
let onTick = () => {
};
let lastReportedMinute = 0;
let totalMinutesSent = 0;
const timeListeners = [];

// ▶ Воспроизведение
export function playAudio(title, audioSrc, tickHandler) {
    stopAudio();

    currentTitle = title;
    startTime = Date.now();
    lastReportedMinute = 0;
    totalMinutesSent = 0;
    onTick = tickHandler;

    // Сохраняем в localStorage
    localStorage.setItem("audioTitle", title);
    localStorage.setItem("audioStart", startTime.toString());
    localStorage.setItem("audioSrc", audioSrc);

    currentAudio = new Audio(audioSrc);
    currentAudio.loop = true;
    currentAudio.play()
        .then(() => console.log(`▶ Playing: ${title}`))
        .catch(e => console.error('⚠ Playback error:', e));

    interval = setInterval(trackTime, 5000);
}

// ⏹ Остановка
export function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        console.log(`⏹ Stopped: ${currentTitle}`);
    }

    clearInterval(interval);
    interval = null;
    startTime = null;
    currentTitle = '';
    lastReportedMinute = 0;
    totalMinutesSent = 0;

    localStorage.removeItem("audioTitle");
    localStorage.removeItem("audioStart");
    localStorage.removeItem("audioSrc");

    timeListeners.forEach(fn => fn(0));
}

// ⏱ Текущее время
export function getCurrentMinutes() {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 60000);
}

export function getCurrentSeconds() {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 1000);
}

export function getCurrentTitle() {
    return currentTitle;
}

// 📦 Сохранённое состояние (если не reload)
export function getSavedAudioInfo() {
    const wasReload = sessionStorage.getItem("wasReload") === "true";
    sessionStorage.removeItem("wasReload");

    const title = localStorage.getItem("audioTitle");
    const start = localStorage.getItem("audioStart");
    const src = localStorage.getItem("audioSrc");

    const shouldRestore = !wasReload && title && start && src;
    return shouldRestore ? {title, start, src} : null;
}

// ✅ Проверка, активен ли звук (без reload)
export function isAudioActiveFor(title) {
    const savedTitle = localStorage.getItem("audioTitle");
    const audioExists = !!currentAudio;
    return savedTitle === title && audioExists;
}

// ⏳ Отслеживание минут
function trackTime() {
    const minutes = getCurrentMinutes();
    timeListeners.forEach(fn => fn(minutes));

    if (minutes > lastReportedMinute) {
        const delta = minutes - lastReportedMinute;
        console.log(`🔄 onTick: +${delta} min passed`);

        for (let i = 0; i < delta; i++) {
            if (totalMinutesSent < minutes) {
                onTick(1);
                totalMinutesSent++;
            } else {
                console.log("⚠ Skip duplicate onTick");
            }
        }

        lastReportedMinute = minutes;
    }
}
