import {useEffect, useRef, useState} from "react";
import TrainingControls from "../../../components/TrainingControls/TrainingControls.jsx";
import {onStartTraining, updateStreak} from "../../../firebaseHelpers.js";
import SettingsModal from "../../../components/Modal/SettingsModal/SettingsModal.jsx";
import InfoModal from "../../../components/Modal/InfoModal/InfoModal.jsx";

function TrackingDot() {
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [dotSize, setDotSize] = useState("Medium");
    const [speed, setSpeed] = useState("1x");
    const [trajectory, setTrajectory] = useState("Cross");
    const [crossPhase, setCrossPhase] = useState("horizontal"); // "horizontal" или "vertical"
    const [crossForward, setCrossForward] = useState(true);     // true: вправо/вниз, false: влево/вверх
    const [showPath, setShowPath] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    // Для анимации точки
    const [dotPos, setDotPos] = useState(0);
    const requestRef = useRef();
    const directionRef = useRef(1);

    const DOT_RADIUS_MAP = {
        Small: 12,
        Medium: 22,
        Large: 30,
    };

    const SPEED_MAP = {
        "0.5x": 0.5,
        "1x": 1,
        "1.5x": 1.5,
    };

    const width = 1200;
    const height = 700;

    // Для паузы при открытии модалок
    useEffect(() => {
        if (showSettings || showHelp) {
            setIsPaused(true);
        } else {
            setIsPaused(false);
        }
    }, [showSettings, showHelp]);

    useEffect(() => {
        if (trajectory !== "Cross") return;
        const interval = setInterval(() => {
            setCrossPhase(ph => ph === "horizontal" ? "vertical" : "horizontal");
        }, 15000); // 15 секунд

        return () => clearInterval(interval);
    }, [trajectory]);

    // Анимация точки (запускается всегда, но обновляет dotPos только если !isPaused)
    useEffect(() => {
        if (trajectory !== "Cross" || isPaused) return;

        let lastTime = performance.now();

        function animate(now) {
            const dt = (now - lastTime) / 1000;
            lastTime = now;
            let velocity = SPEED_MAP[speed];
            setDotPos(prev => {
                let next = prev + (crossForward ? 1 : -1) * velocity * dt;

                // Проверяем края
                if (next > 1) {
                    next = 1;
                    // Меняем направление и фазу
                    setTimeout(() => {
                        setCrossForward(false); // меняем направление
                        setCrossPhase(ph => ph === "horizontal" ? "vertical" : "horizontal");
                    }, 0);
                } else if (next < 0) {
                    next = 0;
                    setTimeout(() => {
                        setCrossForward(true);
                        setCrossPhase(ph => ph === "horizontal" ? "vertical" : "horizontal");
                    }, 0);
                }
                return next;
            });
            requestRef.current = requestAnimationFrame(animate);
        }

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [speed, trajectory, isPaused, crossForward]);


    let dotX = width / 2;
    let dotY = height / 2;

    if (trajectory === "Cross") {
        if (crossPhase === "horizontal") {
            dotX = 50 + dotPos * (width - 100);
            dotY = height / 2;
        } else if (crossPhase === "vertical") {
            dotX = width / 2;
            dotY = 50 + dotPos * (height - 100);
        }
    } else if (trajectory === "Circle") {
        const R = Math.min(width, height) * 0.45;
        // directionRef.current === 1 — по часовой, -1 — против
        const angle = 2 * Math.PI * dotPos * directionRef.current;
        dotX = width / 2 + R * Math.cos(angle);
        dotY = height / 2 + R * Math.sin(angle);
    } else if (trajectory === "Infinity") {
        const a = Math.min(width, height) * 0.8;
        const t = 2 * Math.PI * dotPos * directionRef.current;
        dotX = width / 2 + a * Math.sin(t);
        dotY = height / 2 + a * Math.sin(t) * Math.cos(t);
    }

    // --- Путь (траектория) ---
    function renderPath() {
        if (!showPath) return null;
        if (trajectory === "Cross") {
            return (
                <>
                    <svg width={width} height={height}
                         style={{display: "block", background: "white", borderRadius: 24}}>
                        <defs>
                            {/* Горизонтальные стрелки */}
                            <marker id="left" markerWidth="10" markerHeight="10" refX="10" refY="5"
                                    orient="left">
                                <polyline points="0,0 10,5 0,10" fill="none" stroke="#dad2e8" strokeWidth="1"/>
                            </marker>
                            <marker id="right" markerWidth="10" markerHeight="10" refX="0" refY="5"
                                    orient="right">
                                <polyline points="10,0 0,5 10,10" fill="none" stroke="#dad2e8" strokeWidth="1"/>
                            </marker>

                            {/* Вертикальные стрелки */}
                            <marker id="up" markerWidth="10" markerHeight="10" refX="5" refY="0"
                                    orient="up">
                                <polyline points="0,10 5,0 10,10" fill="none" stroke="#dad2e8" strokeWidth="1"/>
                            </marker>
                            <marker id="down" markerWidth="10" markerHeight="10" refX="5" refY="10"
                                    orient="down">
                                <polyline points="0,0 5,10 10,0" fill="none" stroke="#dad2e8" strokeWidth="1"/>
                            </marker>
                        </defs>
                        {/* Линии */}
                        {/* Горизонтальная */}
                        <line
                            x1={50}
                            y1={height / 2}
                            x2={width - 50}
                            y2={height / 2}
                            stroke="#dad2e8"
                            strokeWidth={4}
                            markerEnd="url(#left)"
                            markerStart="url(#right)"
                        />
                        {/* Вертикальная */}
                        <line
                            x1={width / 2}
                            y1={50}
                            x2={width / 2}
                            y2={height - 50}
                            stroke="#dad2e8"
                            strokeWidth={4}
                            markerEnd="url(#down)"
                            markerStart="url(#up)"
                        />
                    </svg>
                </>
            );
        }
        if (trajectory === "Circle") {
            const R = Math.min(width, height) * 0.45;
            return (
                <circle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke="#dad2e8"
                    strokeWidth={4}
                    fill="none"
                />
            );
        }
        if (trajectory === "Infinity") {
            // Восьмёрка через path
            const a = Math.min(width, height) * 0.8;
            // Строим path SVG
            let path = "";
            for (let i = 0; i <= 100; i++) {
                const t = (2 * Math.PI * i) / 100;
                const x = width / 2 + a * Math.sin(t);
                const y = height / 2 + a * Math.sin(t) * Math.cos(t);
                path += (i === 0 ? "M" : "L") + x + " " + y + " ";
            }
            return (
                <path
                    d={path}
                    stroke="#dad2e8"
                    strokeWidth={4}
                    fill="none"
                />
            );
        }
        return null;
    }

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
                {label: "Cross", value: "Cross"},
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
    };

    const handleNext = () => {
    };


    return (
        <>
            {/* Тренировка на весь экран */}
            <div className="training-content" style={{width, height, margin: "0 auto", position: "relative"}}>
                <svg width={width} height={height} style={{display: "block", background: "white", borderRadius: 24}}>
                    {/* Trajectory */}
                    {renderPath()}
                    {/* Стрелки на концах (только для линии) */}
                    {trajectory === "Cross" && (
                        <defs>
                            <marker id="arrowhead" markerWidth="16" markerHeight="16" refX="8" refY="8" orient="auto">
                                <path d="M2,2 L14,8 L2,14" stroke="#dad2e8" strokeWidth="2" fill="none"/>
                            </marker>
                            <marker id="arrowhead-start" markerWidth="16" markerHeight="16" refX="14" refY="8"
                                    orient="auto">
                                <path d="M14,2 L2,8 L14,14" stroke="#dad2e8" strokeWidth="2" fill="none"/>
                            </marker>
                        </defs>
                    )}
                    {/* Dot (сама точка) */}
                    <circle
                        cx={dotX}
                        cy={dotY}
                        r={DOT_RADIUS_MAP[dotSize]}
                        fill="#7B3FF2"
                        style={{transition: "r 0.15s"}}
                    />
                </svg>

            </div>

            {/* Нижнее меню управления */}
            <TrainingControls
                isPaused={isPaused}
                onSettings={() => setShowSettings(true)}
                onBack={handleBack}
                onPause={() => setIsPaused(p => !p)}
                onNext={handleNext}
                onHelp={() => setShowHelp(true)}
            />

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
                    message={
                        'Follow the moving dot with your eyes to the screen’s edge, moving your gaze as far as comfortable.\n\nDo not strain your eyes—move them gently and take breaks if needed.'
                    }
                    onClose={() => setShowHelp(false)}
                />
            )}
        </>
    );
}

export default TrackingDot;
