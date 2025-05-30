import {useEffect, useState} from "react";
import TrainingControls from "../../../components/TrainingControls/TrainingControls.jsx";
import {onStartTraining, updateStreak} from "../../../firebaseHelpers.js";

function TrackingDot() {

    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        console.log("⚡ useEffect стартует");

        const run = async () => {
            try {
                console.log("🟢 Зову onStartTraining...");
                await onStartTraining('vision');

                console.log("🟠 Зову updateStreak...");
                await updateStreak();
            } catch (err) {
                console.error("🔥 Ошибка в тренировке:", err);
            }
        };

        run();
    }, []);


    const handleBack = () => {
        console.log("Restart or go back");
        // логика возврата или перезапуска
    };

    const handleNext = () => {
        console.log("Go to next training");
        // переход к следующей тренировке (пока можно оставить пустым)
    };

    return (
        <>
            {/* Тренировка на весь экран */}
            <div className="training-content">
                {/* точка, траектория и т.д. будут здесь */}
            </div>

            {/* Нижнее меню управления */}
            <TrainingControls
                onSettings={() => setShowSettings(true)}
                onBack={handleBack}
                onNext={handleNext}
                onHelp={() => setShowHelp(true)}
            />

            {/* Модалки — пока просто заглушки */}
            {showSettings && <div className="modal">Settings</div>}
            {showHelp && <div className="modal">Help instructions</div>}
        </>
    );
}

export default TrackingDot;
