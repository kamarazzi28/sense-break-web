import {useState} from 'react';
import Input from '../components/InputFields/Input';
import '../index.css';
import Button from "../components/Button/Button.jsx";
import {createUserIfNotExists, handleGoogleLogin} from '../firebaseHelpers';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../firebase';
import {useNavigate} from "react-router-dom";


function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validate = () => {
        const newErrors = {};
        if (username.length < 3) newErrors.username = 'Name must be 2–18 letters (A–Z, a–z)';
        if (!email.includes('@')) newErrors.email = 'Please enter a valid email address';
        if (password.length < 6) newErrors.password = 'Password too short';
        if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, {displayName: username});
            await createUserIfNotExists(result.user);
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrors({email: 'Email already in use'});
        }
    };


    return (
        <div className="auth-page">
            <div className="auth-left">
                <img src="/images/logo/sb_logo_with_white_bg.svg" className="logo" alt="Logo"/>
                <h2>Let’s get started!</h2>
                <p className="auth-subtitle">It only takes a minute to join</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={errors.username}
                        variant="plain"
                    />
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        variant="plain"
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        variant="plain"
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        variant="plain"
                    />
                    <div className="auth-button">
                        <Button
                            name="Sign up"
                            color="orange"
                            type="submit"
                        />
                    </div>
                </form>

                <p className="or-text">Or continue with</p>

                <div className="social-icons">
                    <button onClick={handleGoogleLogin}>
                        <img src="/images/figures/google.svg" alt="Google"/>
                    </button>
                    <img src="/images/figures/github.svg" alt="GitHub"/>
                    <img src="/images/figures/facebook.svg" alt="Facebook"/>
                </div>

                <p className="signup-text">
                    Joined before? <a href="/Login">Login</a>
                </p>
            </div>
            <div className="auth-right">
                <img src="/images/girl/girl_registration.png" alt="Illustration"/>
            </div>


        </div>
    )
}

export default Register;
