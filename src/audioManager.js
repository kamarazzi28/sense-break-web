// noinspection JSIgnoredPromiseFromCall

let currentAudio = null;
let currentTitle = '';
let interval = null;
let onTick = () => {
};

export function playAudio(title, audioSrc, onTimeTick) {
    stopAudio(); // Остановить предыдущее

    currentTitle = title;
    currentAudio = new Audio(audioSrc);
    currentAudio.loop = true;
    currentAudio.play();

    onTick = onTimeTick;
    interval = setInterval(() => {
        onTick(1); // каждый тик 1 минута симуляции (можно изменить на 1 сек = 1 мин в тренировочном режиме)
    }, 30000); // 1 минута
}

export function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    currentTitle = '';
}

export function getCurrentTitle() {
    return currentTitle;
}
