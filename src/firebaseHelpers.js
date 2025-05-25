import {doc, getDoc, setDoc} from 'firebase/firestore';
import {signInWithPopup} from 'firebase/auth';
import {auth, db, googleProvider} from './firebase';

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

export const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await createUserIfNotExists(user);
    window.location.href = '/';
};
