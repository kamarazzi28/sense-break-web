import {Outlet, useNavigate} from "react-router-dom";
import '../../index.css';
import './TrainingLayout.css';
import TrainingHeader from "../../components/TrainingHeader/TrainingHeader.jsx";
import {useState} from "react";
import ConfirmModal from "../../components/Modal/ConfirmModal.jsx";

function TrainingLayout() {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const navigate = useNavigate();

    // Функция вызова модалки — будет вызываться из TrainingHeader через callback
    const handleCloseTraining = () => {
        setShowConfirmDialog(true);
    };

    // Завершение тренировки
    const confirmExit = () => {
        navigate(-1); // возвращаемся назад
    };

    return (
        <div className="training-layout">
            {/* Header с кнопкой выхода */}
            <TrainingHeader onClose={handleCloseTraining}/>

            {/* Основной контент */}
            <Outlet/>

            {/* Модальное окно подтверждения выхода */}
            {showConfirmDialog && (
                <ConfirmModal
                    title="Are you sure?"
                    nameRed="Exit"
                    namePurple="Continue"
                    message="Do you really want to end this training?"
                    onConfirm={confirmExit}
                    onCancel={() => setShowConfirmDialog(false)}
                />
            )}
        </div>
    );
}

export default TrainingLayout;
