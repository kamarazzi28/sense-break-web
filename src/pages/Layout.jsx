import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import {Outlet} from 'react-router-dom';
import '../index.css';

function Layout() {
    return (
        <div className="app-layout">
            <Sidebar/>
            <main className="app-content">
                <Header name="Kami"/>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
