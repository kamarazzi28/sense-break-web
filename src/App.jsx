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
import AccountSettings from "./pages/AccountSettings.jsx";
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import AmbientSounds from "./pages/AmbientSounds.jsx";
import {TrackingDot} from "./pages/trainings/vision/TrackingDot.jsx";
import TrainingLayout from "./pages/trainings/TrainingLayout.jsx";

function App() {
    return (
        <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            {/* Protected pages with TrainingLayout (full screen) */}
            <Route path="/trainings" element={
                <PrivateRoute>
                    <TrainingLayout/>
                </PrivateRoute>
            }>
                <Route path="vision/tracking-dot" element={<TrackingDot/>}/>
            </Route>


            {/* Protected pages with Layout */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout/>
                    </PrivateRoute>
                }
            >
                <Route index element={<Dashboard/>}/>
                <Route path="vision" element={<Vision/>}/>
                <Route path="hearing" element={<Hearing/>}/>
                <Route path="progress" element={<Progress/>}/>
                <Route path="notifications" element={<Notifications/>}/>
                <Route path="settings" element={<Settings/>}/>
                <Route path="accountSettings" element={<AccountSettings/>}/>
                <Route path="ambientSounds" element={<AmbientSounds/>}/>
            </Route>
        </Routes>

    );
}

export default App;
