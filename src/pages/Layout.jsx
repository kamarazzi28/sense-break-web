import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import {Outlet} from 'react-router-dom';
import '../index.css';

function Layout() {
    return (
        <div className="app-layout">
            <div className="app-sidebar">
                <Sidebar/>
            </div>
            <div className="app-scroll-container">
                <Header name="Kami"/>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
