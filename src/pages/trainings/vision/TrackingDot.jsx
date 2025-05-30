import {useEffect, useState} from "react";
import TrainingControls from "../../../components/TrainingControls/TrainingControls.jsx";
import {onStartTraining, updateStreak} from "../../../firebaseHelpers.js";
import SettingsModal from "../../../components/Modal/SettingsModal/SettingsModal.jsx";
import InfoModal from "../../../components/Modal/InfoModal/InfoModal.jsx";

function TrackingDot() {
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [dotSize, setDotSize] = useState("Medium");
    const [speed, setSpeed] = useState("1x");
    const [trajectory, setTrajectory] = useState("Line");
    const [showPath, setShowPath] = useState(true);

    const settingsOptions = [
        {
            label: "Dot Size",
            type: "select",
            value: dotSize,
            onChange: setDotSize,
            options: [
                {label: "Small", value: "Small"},
                {label: "Medium", value: "Medium"},
                {label: "Large", value: "Large"}
            ]
        },
        {
            label: "Dot Speed",
            type: "select",
            value: speed,
            onChange: setSpeed,
            options: [
                {label: "0.5x", value: "0.5x"},
                {label: "1x", value: "1x"},
                {label: "1.5x", value: "1.5x"}
            ]
        },
        {
            label: "Trajectory Type",
            type: "select",
            value: trajectory,
            onChange: setTrajectory,
            options: [
                {label: "Line", value: "Line"},
                {label: "Circle", value: "Circle"},
                {label: "Infinity", value: "Infinity"}
            ]
        },
        {
            label: "Show Trajectory",
            type: "toggle",
            value: showPath,
            onChange: setShowPath
        }
    ];


    useEffect(() => {
        console.log("⚡ useEffect стартует");

        const run = async () => {
            try {
                await onStartTraining('vision');
                await updateStreak();
            } catch (err) {
                console.error("🔥 Fail in training", err);
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
            {showSettings && (
                <SettingsModal
                    settings={{
                        selects: settingsOptions
                            .filter(opt => opt.type === "select")
                            .map(opt => ({
                                name: opt.label,
                                label: opt.label,
                                value: opt.value,
                                options: opt.options
                            })),
                        toggles: settingsOptions
                            .filter(opt => opt.type === "toggle")
                            .map(opt => ({
                                name: opt.label,
                                label: opt.label,
                                value: opt.value
                            }))
                    }}
                    onChange={(name, newValue) => {
                        const option = settingsOptions.find(opt => opt.label === name);
                        if (option) {
                            option.onChange(newValue);
                        }
                    }}
                    onClose={() => setShowSettings(false)}
                />

            )}
            {showHelp && (
                <InfoModal
                    message={'Follow the moving dot with your eyes to the screen’s edge, moving your gaze as far as comfortable.\n\nDo not strain your eyes—move them gently and take breaks if needed.'}
                    onClose={() => setShowHelp(false)}
                />
            )}
        </>
    );
}

export default TrackingDot;
