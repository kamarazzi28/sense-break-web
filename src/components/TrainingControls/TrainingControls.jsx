import './TrainingControls.css';
import IconButton from '../IconButton/IconButton.jsx';
import PauseIcon from '@mui/icons-material/Pause';
import SettingsIcon from '@mui/icons-material/Settings';
import {FastForwardIcon, HelpCircle, RewindIcon} from "lucide-react";

function TrainingControls({onSettings, onBack, onPause, onNext, onHelp}) {
    return (
        <div className="training-controls">
            <IconButton onClick={onSettings}><SettingsIcon size={22}/></IconButton>
            <IconButton onClick={onBack}><RewindIcon size={22}/></IconButton>
            <IconButton onClick={onPause}><PauseIcon size={22}/></IconButton>
            <IconButton onClick={onNext}>< FastForwardIcon size={22}/></IconButton>
            <IconButton onClick={onHelp}><HelpCircle size={22}/></IconButton>
        </div>
    );
}

export default TrainingControls;
