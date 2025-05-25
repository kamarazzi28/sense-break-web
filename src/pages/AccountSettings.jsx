// noinspection JSCheckFunctionSignatures,t,JSIgnoredPromiseFromCall

import '../index.css';
import Title from '../components/Title/Title.jsx';
import Input from '../components/InputFields/Input.jsx';
import Button from '../components/Button/Button.jsx';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import CustomSelect from "../components/CustomSelect/CustomSelect.jsx";
import DatePicker from "../components/DatePicker/DatePicker.jsx";
import {useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from '../firebase';
import AvatarPreview from "../components/AvatarPreview/AvatarPreview.jsx";

const AVATAR_PLACEHOLDER = "/images/figures/avatar_placeholder.svg";

function AccountSettings() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        gender: '',
        location: '',
        dateOfBirth: null,
        avatarURL: AVATAR_PLACEHOLDER,
    });
    const [initialData, setInitialData] = useState(null);
    const [selectedAvatarBase64, setSelectedAvatarBase64] = useState(null);
    const [previewURL, setPreviewURL] = useState(AVATAR_PLACEHOLDER);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [avatarMarkedForDeletion, setAvatarMarkedForDeletion] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        const fetchUserData = async () => {
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const loadedData = {
                    username: data.username || '',
                    email: data.email || '',
                    gender: data.gender || '',
                    location: data.location || '',
                    dateOfBirth: data.dateOfBirth ? dayjs(data.dateOfBirth) : null,
                    avatarURL: data.avatarURL || AVATAR_PLACEHOLDER
                };
                setForm(loadedData);
                setInitialData(loadedData);
                setPreviewURL(loadedData.avatarURL);
            }
        };
        fetchUserData().catch(console.error);
    }, [user]);

    const validate = () => {
        const newErrors = {};
        if (form.username.length < 2) newErrors.username = 'Name must be at least 2 characters';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            let avatarURL = form.avatarURL;

            if (avatarMarkedForDeletion) {
                avatarURL = AVATAR_PLACEHOLDER;
            } else if (selectedAvatarBase64) {
                avatarURL = selectedAvatarBase64;
            }

            const userDataToSave = {
                ...form,
                avatarURL,
                dateOfBirth: form.dateOfBirth ? form.dateOfBirth.toISOString() : null
            };

            await setDoc(doc(db, 'users', user.uid), userDataToSave);

            setForm(prev => ({...prev, avatarURL}));
            setPreviewURL(avatarURL);
            setInitialData({...userDataToSave});
            setSelectedAvatarBase64(null);
            setErrors({});
            setAvatarMarkedForDeletion(false);
            setSuccessMessage("Profile saved successfully!");
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    const handleDiscard = () => {
        if (!initialData) return;

        setForm({
            ...initialData,
            dateOfBirth: initialData.dateOfBirth ? dayjs(initialData.dateOfBirth) : null
        });

        setPreviewURL(initialData.avatarURL || AVATAR_PLACEHOLDER);
        setSelectedAvatarBase64(null);
        setAvatarMarkedForDeletion(false);

        const input = document.getElementById('avatar-upload');
        if (input) input.value = null;
    };


    const handleLogout = () => {
        signOut(auth).then(() => navigate('/login')).catch(console.error);
    };
    const handleChange = (key, value) => {
        setForm(prev => ({...prev, [key]: value}));
        if (errors[key]) {
            setErrors(prev => ({...prev, [key]: undefined}));
        }
    };

    return (
        <>
            <Title name="Account Settings" text=""/>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="account-settings-container">
                <div className="account-group">
                    <AvatarPreview
                        initialURL={previewURL}
                        onFileChange={(base64) => {
                            setSelectedAvatarBase64(base64);
                            setAvatarMarkedForDeletion(!base64); // если файл выбран — false, если удалён — true
                        }}
                        onDelete={() => {
                            setAvatarMarkedForDeletion(true);
                            setSelectedAvatarBase64(null);
                        }}
                        onLogout={handleLogout}
                    />

                </div>

                <div className="account-group">
                    <form className="account-form" onSubmit={handleSubmit}>
                        <div className="input-pair">
                            <Input
                                label="Name"
                                value={form.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                                error={errors.username}
                                variant="outlined"
                                placeholder="Your Name"
                            />
                            <CustomSelect
                                label="Gender"
                                value={form.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                                options={[
                                    {value: 'Female', label: 'Female'},
                                    {value: 'Male', label: 'Male'},
                                    {value: 'Other', label: 'Other'}
                                ]}
                                placeholder="Not selected"
                                variant="input"
                            />
                        </div>
                        <div className="input-pair">
                            <DatePicker
                                label="Date of Birth"
                                value={form.dateOfBirth}
                                onChange={(newValue) => handleChange('dateOfBirth', newValue)}
                            />
                            <CustomSelect
                                label="Location"
                                value={form.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                options={[
                                    {value: 'Prague, Czechia', label: 'Prague, Czechia'},
                                    {value: 'Brno, Czechia', label: 'Brno, Czechia'},
                                    {value: 'Vienna, Austria', label: 'Vienna, Austria'},
                                    {value: 'Other', label: 'Other'}
                                ]}
                                placeholder="Not selected"
                                variant="input"
                            />
                        </div>
                        <div className="input-pair">
                            <Input
                                type="email"
                                label="Email"
                                helper="Email is linked to account and can’t be changed"
                                placeholder={form.email || 'Your email'}
                                disabled
                            />
                            <Input
                                type="password"
                                label="Password"
                                helper="To change password go to settings"
                                disabled
                                value="***************"
                            />
                        </div>
                        <div className="button-row">
                            <Button name="Discard Changes" color="red" type="button" onClick={handleDiscard}/>
                            <Button name="Save Changes" color="purple" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AccountSettings;
