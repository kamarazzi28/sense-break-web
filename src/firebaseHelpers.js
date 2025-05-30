// noinspection JSCheckFunctionSignatures

import {doc, getDoc, increment, onSnapshot, setDoc, updateDoc} from 'firebase/firestore';
import {getAuth, signInWithPopup} from 'firebase/auth';
import {auth, db, googleProvider} from './firebase';

const formatRelaxationTime = (minutes) => {
    const hr = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hr > 0 ? `${hr} hr ` : ''}${min} min`;
};

// ✅ Create user and progress document if not exists
export const createUserIfNotExists = async (user, username) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            username: username || user.displayName || '',
            email: user.email,
            createdAt: new Date().toISOString(),
            streak: 0,
            trainings: [],
            avatarURL: "/images/figures/avatar_placeholder.svg"
        });
        console.log("✅ New user created");
    }

    const progressRef = doc(db, 'progress', user.uid);
    const progressSnap = await getDoc(progressRef);

    if (!progressSnap.exists()) {
        const today = new Date().toISOString().slice(0, 10);
        await setDoc(progressRef, {
            visionSessions: 0,
            hearingSessions: 0,
            relaxationMinutes: 0,
            sessionsByDate: {
                [today]: {vision: 0, hearing: 0}
            },
            lastActive: today,
            streak: {current: 0, longest: 0}
        });
        console.log("✅ Progress initialized for new user");
    }
};

// ✅ Sign in with Google and create user if needed
export const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await createUserIfNotExists(user);
    window.location.href = '/';
};

// ✅ Track training session
export const onStartTraining = async (type) => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const today = new Date().toISOString().slice(0, 10);
    const progressRef = doc(db, 'progress', uid);

    const progressSnap = await getDoc(progressRef);
    if (!progressSnap.exists()) return;

    const updates = {
        lastActive: today,
        [`sessionsByDate.${today}.${type}`]: increment(1)
    };

    if (type === 'vision') updates.visionSessions = increment(1);
    if (type === 'hearing') updates.hearingSessions = increment(1);
    if (type === 'relaxation') updates.relaxationMinutes = increment(1);

    await updateDoc(progressRef, updates);
    console.log(`✅ ${type} training recorded for ${today}`);
};

// ✅ Update streak (only once per day)
export const updateStreak = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const progressRef = doc(db, 'progress', uid);
    const snap = await getDoc(progressRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const sessionsByDate = data.sessionsByDate || {};
    const streak = data.streak || {current: 0, longest: 0};

    const yesterdayData = sessionsByDate[yesterday];

    // ✅ Skip if streak already updated today
    if (data.lastActive === today && streak.current > 0) {
        console.log("⏩ Streak already updated today");
        return;
    }

    const hadActivityYesterday = yesterdayData && (yesterdayData.vision || yesterdayData.hearing);
    const newCurrent = hadActivityYesterday ? streak.current + 1 : 1;
    const newLongest = Math.max(newCurrent, streak.longest || 0);

    await updateDoc(progressRef, {
        'streak.current': newCurrent,
        'streak.longest': newLongest
    });


    console.log(`🔥 Streak updated: current = ${newCurrent}, longest = ${newLongest}`);
};

// ✅ Get user stats (one-time fetch)
export const getUserStats = async () => {
    const user = getAuth().currentUser;
    if (!user) return null;

    const uid = user.uid;
    const docRef = doc(db, "progress", uid);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;

    const data = snap.data();
    const streak = data.streak || {current: 0, longest: 0};
    const vision = data.visionSessions || 0;
    const hearing = data.hearingSessions || 0;
    const relaxationMin = data.relaxationMinutes || 0;
    const total = vision + hearing;

    return {
        total,
        vision,
        hearing,
        relaxation: formatRelaxationTime(relaxationMin),
        streak: {
            current: streak.current || 0,
            longest: streak.longest || 0
        }
    };
};

// ✅ Listen to user stats in real-time
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

        onUpdate({
            total,
            vision,
            hearing,
            relaxation: formatRelaxationTime(relaxationMin),
            streak: {
                current: data.streak?.current || 0,
                longest: data.streak?.longest || 0
            }
        });
    });
};
