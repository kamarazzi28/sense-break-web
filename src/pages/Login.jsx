import {useState} from 'react';
import Input from '../components/InputFields/Input';
import '../index.css';
import Button from "../components/Button/Button.jsx";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email.includes('@')) newErrors.email = 'Invalid email or password';
        if (password.length < 6) newErrors.password = 'Invalid email or password';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log('Login successful!');
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
                    <button onClick={handleGitHubLogin}>
                        <img src="/images/figures/github.svg" alt="GitHub"/>
                    </button>
                    <button onClick={handleFacebookLogin}>
                        <img src="/images/figures/facebook.svg" alt="Facebook"/>
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
    )
}

export default Login;
