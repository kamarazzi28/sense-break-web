import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar/>
            <main className="dashboard-content">
                <Header name="Kami"/>
                <Title
                    name="Pick your training for today"
                    text={`Short exercises that help reduce eye strain and keep your vision sharp.
                    \nChoose one or try them all – it only takes a few minutes.`}
                />
                <Title name="Choose training" text=""/>
            </main>
        </div>)
}

export default Dashboard;