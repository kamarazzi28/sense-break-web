import {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import {Outlet} from 'react-router-dom';
import '../index.css';

function Layout() {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const shouldCollapse = window.innerWidth < 1024;
            setCollapsed(shouldCollapse);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`app-layout ${collapsed ? 'collapsed' : ''}`}>
            <div className={`sidebar-wrapper ${collapsed ? 'collapsed' : ''}`}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            </div>
            <div className="app-scroll-container">
                <Header name="Kami"/>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
