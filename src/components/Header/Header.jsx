import './Header.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {ArrowLeftIcon, SearchIcon, UserRoundIcon} from 'lucide-react';
import IconButton from '../IconButton/IconButton.jsx';
import {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../../firebase'; // поправь путь, если у тебя другой

function Header({name = 'User'}) {
    const location = useLocation();
    const navigate = useNavigate();
    const isDashboard = location.pathname === '/';

    const [username, setUsername] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && isDashboard) {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUsername(data.username || 'User');
                    }
                } catch (error) {
                    console.error('Failed to fetch username:', error);
                }
            }
        });

        return () => unsubscribe();
    }, [isDashboard]);

    const now = new Date();
    const hour = now.getHours();

    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="header">
            {isDashboard ? (
                <div className="header-text">
                    <h1 className="header-title">{greeting}, {username || name}!</h1>
                    <p className="header-date">Today is {formattedDate}</p>
                </div>
            ) : (
                <IconButton icon={<ArrowLeftIcon/>} onClick={() => navigate('/')}/>
            )}
            <div className="header-right">
                <IconButton icon={<SearchIcon/>} onClick={() => console.log('Search')}/>
                <IconButton icon={<UserRoundIcon/>} onClick={() => navigate('/AccountSettings')}/>
            </div>
        </div>
    );
}

export default Header;
