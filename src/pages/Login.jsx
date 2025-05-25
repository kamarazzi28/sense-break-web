import {browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useState} from 'react';
import Input from '../components/InputFields/Input';
import '../index.css';
import Button from "../components/Button/Button.jsx";
import {createUserIfNotExists, handleGoogleLogin} from '../firebaseHelpers';
import {auth} from '../firebase.js';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email.includes('@')) newErrors.email = 'Invalid email or password';
        if (password.length < 6) newErrors.password = 'Invalid email or password';
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
            await setPersistence(auth, browserSessionPersistence); // можно заменить на local, если хочешь
            const result = await signInWithEmailAndPassword(auth, email, password);
            await createUserIfNotExists(result.user);

            // Сохраняем время входа
            const loginTime = Date.now();
            localStorage.setItem('loginTime', loginTime.toString());

            // Запускаем таймер выхода через 1 час (3600000 мс)
            setTimeout(() => {
                signOut(auth).then(() => {
                    console.log('Logged out after 1 hour');
                    navigate('/login');
                });
            }, 60 * 60 * 1000);

            navigate('/');
        } catch (error) {
            console.error(error);
            setErrors({
                email: 'Invalid email or password',
                password: 'Invalid email or password'
            });
        }
    };


    return (
        <div className="auth-page">
            <div className="auth-left">
                <img src="/images/logo/sb_logo_with_white_bg.svg" className="logo" alt="Logo"/>
                <h2>Hello again!</h2>
                <p className="auth-subtitle">Daily practice makes perfect — keep going!</p>

                <form onSubmit={handleSubmit}>
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
                    <a href="#" className="recovery-link">Recovery password</a>
                    <div className="auth-button">
                        <Button
                            name="Login"
                            color="purple"
                            type="submit"
                        />
                    </div>
                </form>

                <p className="or-text">Or continue with</p>

                <div className="social-icons">
                    <button onClick={handleGoogleLogin}>
                        <img src="/images/figures/google.svg" alt="Google"/>
                    </button>
                </div>

                <p className="signup-text">
                    Not a member yet? <a href="/Register">Register now</a>
                </p>
            </div>
            <div className="auth-right">
                <img src="/images/girl/girl_jumping.png" alt="Illustration"/>
            </div>
        </div>
    );
}

export default Login;
