import './Sidebar.css';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {ArrowLeftFromLine, ArrowRightFromLine} from 'lucide-react';

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
    const [collapsed, setCollapsed] = useState(false);

    // Optional: auto-collapse on small screens
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setCollapsed(true);
        }
    }, []);

    return (
        <div className={`sidebar-wrapper ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar">
                <div className="sidebar-header">
                    {!collapsed && (
                        <div className="sidebar-title">
                            <img src="/images/logo/sb_logo_with_white_bg.svg" alt="Logo" className="sidebar-logo"/>
                            <span>Sense Break</span>
                        </div>
                    )}
                    <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <ArrowRightFromLine size={22}/> : <ArrowLeftFromLine size={22}/>}
                    </button>
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
                                fullWidth={!collapsed}
                            >
                                {!collapsed && item.label}
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
                        fullWidth={!collapsed}
                    >
                        {!collapsed && bottomNav.label}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
