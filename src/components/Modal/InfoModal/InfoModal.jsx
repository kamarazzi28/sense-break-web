import '../InfoModal/InfoModal.css';
import ReactDOM from "react-dom";
import {X} from "lucide-react";

function InfoModal({message, onClose}) {
    return ReactDOM.createPortal(
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <X size={20} onClick={onClose} className="close-icon"/>
                </div>
                <p className="modal-message">{
                    message.split('\n').map((line, i) => (
                        <span key={i}>{line}<br/></span>
                    ))}</p>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default InfoModal;
