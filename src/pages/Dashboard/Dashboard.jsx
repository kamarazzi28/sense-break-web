import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from "../../components/Header/Header";

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar/>
            <main className="dashboard-content">
                <Header name="Kami"/>
            </main>
        </div>)
}

export default Dashboard;