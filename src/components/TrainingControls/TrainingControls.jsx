import './TrainingControls.css';
import IconButton from '../IconButton/IconButton.jsx';
import PauseIcon from '@mui/icons-material/Pause';
import {FastForwardIcon, HelpCircle, PlayIcon, RewindIcon} from "lucide-react";
import SettingsIcon from '@mui/icons-material/Settings';

function TrainingControls({
                              isPaused,
                              onSettings,
                              onBack,
                              onPause,
                              onNext,
                              onHelp,
                          }) {
    return (
        <div className="training-controls">
            <IconButton onClick={onSettings}><SettingsIcon size={22}/></IconButton>
            <IconButton onClick={onBack}><RewindIcon size={22}/></IconButton>
            <IconButton onClick={onPause}>
                {isPaused ? <PlayIcon size={22}/> : <PauseIcon size={22}/>}
            </IconButton>
            <IconButton onClick={onNext}>< FastForwardIcon size={22}/></IconButton>
            <IconButton onClick={onHelp}><HelpCircle size={22}/></IconButton>
        </div>
    );
}

export default TrainingControls;
