import {Outlet} from "react-router-dom";
import '../../index.css';
import './TrainingLayout.css';

function TrainingLayout() {
    return (
        <div className="training-layout">
            <Outlet/>
        </div>
    );
}

export default TrainingLayout;
