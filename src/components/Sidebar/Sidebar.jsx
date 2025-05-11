import './Sidebar.css';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import {useLocation, useNavigate} from 'react-router-dom';

const topNav = [
    {label: 'Dashboard', icon: <DashboardIcon/>, path: '/'},
    {label: 'Vision', icon: <VisibilityIcon/>, path: '/vision'},
    {label: 'Hearing', icon: <HearingIcon/>, path: '/hearing'},
    {label: 'Progress', icon: <BarChartIcon/>, path: '/progress'},
    {label: 'Notifications', icon: <NotificationsIcon/>, path: '/notifications'},
];

const bottomNav = {
    label: 'Settings',
    icon: <SettingsIcon/>,
    path: '/settings',
};

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="sidebar-title">
                <img src="/images/logo/sb_logo_with_white_bg.svg" alt="Logo" className="sidebar-logo"/>
                <span>Sense Break</span>

            </div>

            <div className="sidebar-buttons">
                {topNav.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Button
                            disableRipple
                            key={item.label}
                            startIcon={item.icon}
                            onClick={() => navigate(item.path)}
                            className={`sidebar-btn ${isActive ? 'active' : ''}`}
                            fullWidth
                        >
                            {item.label}
                        </Button>
                    );
                })}
            </div>

            <div className="sidebar-settings">
                <Button
                    disableRipple
                    startIcon={bottomNav.icon}
                    onClick={() => navigate(bottomNav.path)}
                    className={`sidebar-btn ${location.pathname === bottomNav.path ? 'active' : ''}`}
                    fullWidth
                >
                    {bottomNav.label}
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;
