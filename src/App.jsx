import {Route, Routes} from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard.jsx';
import Vision from './pages/Vision.jsx';
import Hearing from './pages/Hearing.jsx';
import Progress from './pages/Progress.jsx';
import Notifications from './pages/Notifications.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Register from "./pages/Register.jsx";

function App() {
    return (
        <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            {/* App routes */}
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
