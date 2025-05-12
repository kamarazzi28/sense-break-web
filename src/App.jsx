import {Route, Routes} from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Vision from './pages/Vision/Vision';
import Hearing from './pages/Hearing/Hearing';
import Progress from './pages/Progress/Progress';
import Notifications from './pages/Notifications/Notifications';
import Settings from './pages/Settings/Settings';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="vision" element={<Vision/>}/>
                <Route path="hearing" element={<Hearing/>}/>
                <Route path="progress" element={<Progress/>}/>
                <Route path="notifications" element={<Notifications/>}/>
                <Route path="settings" element={<Settings/>}/>
            </Route>
        </Routes>
    );
}

export default App;
