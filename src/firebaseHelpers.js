import {doc, getDoc, increment, onSnapshot, setDoc, updateDoc} from 'firebase/firestore';
import {getAuth, signInWithPopup} from 'firebase/auth';
import {auth, db, googleProvider} from './firebase';

// ✅ Создание пользователя в коллекции "users", если не существует
export const createUserIfNotExists = async (user, username) => {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            username: username || user.displayName || '',
            email: user.email,
            createdAt: new Date().toISOString(),
            streak: 0,
            trainings: [],
            avatarURL: "/images/figures/avatar_placeholder.svg"
        });
    }
};

// ✅ Авторизация через Google + редирект
export const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await createUserIfNotExists(user);
    window.location.href = '/';
};

// ✅ Запись тренировки (vision, hearing, relaxation)
export const onStartTraining = async (type) => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const today = new Date().toISOString().slice(0, 10);
    const progressRef = doc(db, 'progress', uid);

    const progressSnap = await getDoc(progressRef);
    if (!progressSnap.exists()) {
        await setDoc(progressRef, {
            visionSessions: 0,
            hearingSessions: 0,
            relaxationMinutes: 0,
            sessionsByDate: {},
            lastActive: today,
            streak: {current: 1, longest: 1}
        }, {merge: true});
    }

    const updates = {
        lastActive: today,
        [`sessionsByDate.${today}.${type}`]: increment(1)
    };

    if (type === 'vision') updates.visionSessions = increment(1);
    if (type === 'hearing') updates.hearingSessions = increment(1);
    if (type === 'relaxation') updates.relaxationMinutes = increment(15);

    await updateDoc(progressRef, {
        "streak.current": newCurrent,
        "streak.longest": newLongest
    });
};

// ✅ Получение общей статистики
export const getUserStats = async () => {
    const user = getAuth().currentUser;
    if (!user) return null;

    const uid = user.uid;
    const docRef = doc(db, "progress", uid);
    const snap = await getDoc(docRef);

    if (!snap.exists()) return null;

    const data = snap.data();

    const vision = data.visionSessions || 0;
    const hearing = data.hearingSessions || 0;
    const relaxationMin = data.relaxationMinutes || 0;
    const total = vision + hearing;

    const hr = Math.floor(relaxationMin / 60);
    const min = relaxationMin % 60;
    const relaxation = `${hr > 0 ? `${hr} hr ` : ''}${min} min`;

    return {
        total,
        vision,
        hearing,
        relaxation
    };
};

// ✅ Realtime обновление статистики на странице Progress
export const listenToUserStats = (onUpdate) => {
    const user = getAuth().currentUser;
    if (!user) return;

    const uid = user.uid;
    const docRef = doc(db, "progress", uid);

    return onSnapshot(docRef, (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data();
        const vision = data.visionSessions || 0;
        const hearing = data.hearingSessions || 0;
        const relaxationMin = data.relaxationMinutes || 0;
        const total = vision + hearing;

        const hr = Math.floor(relaxationMin / 60);
        const min = relaxationMin % 60;
        const relaxation = `${hr > 0 ? `${hr} hr ` : ''}${min} min`;

        onUpdate({total, vision, hearing, relaxation});
    });
};

// ✅ Обновление streak один раз в день (после входа)
export const updateStreakIfNeeded = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const progressRef = doc(db, 'progress', uid);
    const snap = await getDoc(progressRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const sessionsByDate = data.sessionsByDate || {};
    const streak = data.streak || {current: 0, longest: 0};

    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    const todayData = sessionsByDate[today];
    const yesterdayData = sessionsByDate[yesterday];

    const didTrainToday =
        todayData && (todayData.vision > 0 || todayData.hearing > 0);

    if (!didTrainToday) return;

    const continuedStreak =
        yesterdayData && (yesterdayData.vision > 0 || yesterdayData.hearing > 0);

    const newCurrent = continuedStreak ? streak.current + 1 : 1;
    const newLongest = Math.max(newCurrent, streak.longest || 0);

    await updateDoc(progressRef, {
        'streak.current': newCurrent,
        'streak.longest': newLongest
    });
};
