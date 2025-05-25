import './Header.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {ArrowLeftIcon, SearchIcon, UserRoundIcon} from "lucide-react";
import IconButton from "../IconButton/IconButton.jsx";


function Header({name = 'User'}) {
    const location = useLocation();
    const navigate = useNavigate();

    const isDashboard = location.pathname === '/';

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
                    <h1 className="header-title">{greeting}, {name}!</h1>
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
