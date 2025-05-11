import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar/>
            <main className="dashboard-content">
            </main>
        </div>)
}

export default Dashboard;