// noinspection JSCheckFunctionSignatures

import '../index.css';
import Title from "../components/Title/Title.jsx";
import FeatureRow from "../components/FeatureRow/FeatureRow.jsx";
import CustomSelect from "../components/CustomSelect/CustomSelect.jsx";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {ChevronRightIcon} from "lucide-react";
import {auth, db} from "../firebase";
import {deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential} from "firebase/auth";
import {deleteDoc, doc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "../components/Modal/ConfirmModal.jsx";


function Settings() {
    const [reminder, setReminder] = useState('');
    const [user, setUser] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    const handleDeleteClick = () => {
        setShowConfirmDialog(true);
    };

    const confirmAccountDeletion = async () => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, 'users', user.uid));
            await deleteUser(user);
            navigate('/login');
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                const email = user.email;
                const password = prompt('Please re-enter your password to delete your account:');
                if (!password) return;

                const credential = EmailAuthProvider.credential(email, password);
                try {
                    await reauthenticateWithCredential(user, credential);
                    await deleteDoc(doc(db, 'users', user.uid));
                    await deleteUser(user);
                    navigate('/login');
                } catch (reauthError) {
                    console.error('Re-authentication failed:', reauthError);
                    alert('Re-authentication failed. Please try again.');
                }
            } else {
                console.error('Deletion error:', error);
                alert('Failed to delete account.');
            }
        }
        setShowConfirmDialog(false);
    };

    return (
        <>
            <Title name="General" text=""/>
            <div className="feature-group">
                <FeatureRow
                    title="Language"
                    description="Choose your preferred language"
                    rightElement={
                        <CustomSelect
                            value={reminder}
                            onChange={(e) => setReminder(e.target.value)}
                            options={[
                                {value: 'en', label: 'English'},
                                {value: 'cz', label: 'Czech'},
                            ]}
                            placeholder="English"
                        />
                    }
                />
            </div>

            <Title name="Account Security" text=""/>
            <div className="feature-group">
                <FeatureRow
                    title="Change Password"
                    description="Update your login password for better security"
                    rightElement={
                        <IconButton onClick={() => console.log('Navigate to change password')}>
                            <ChevronRightIcon size={20}/>
                        </IconButton>
                    }
                />
                <FeatureRow
                    title="Recovery Email"
                    description="Update your recovery email address"
                    rightElement={
                        <IconButton onClick={() => console.log('Navigate to recovery settings')}>
                            <ChevronRightIcon size={20}/>
                        </IconButton>
                    }
                />
                <FeatureRow
                    title="Delete Account"
                    titleColor="#B3261E"
                    description="Permanently delete your account and all related data. This action cannot be undone."
                    rightElement={
                        <IconButton onClick={handleDeleteClick}>
                            <ChevronRightIcon size={20}/>
                        </IconButton>
                    }
                />
            </div>

            {showConfirmDialog && (
                <ConfirmModal
                    title="Are you sure?"
                    message="This action will permanently delete your account."
                    onConfirm={confirmAccountDeletion}
                    nameRed="Delete"
                    namePurple="Cancel"
                    onCancel={() => setShowConfirmDialog(false)}
                />
            )}
        </>
    );
}

export default Settings;
