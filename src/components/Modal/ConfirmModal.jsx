import './ConfirmModal.css';
import Button from '../Button/Button.jsx';
import ReactDOM from "react-dom";

function ConfirmModal({title, message, onConfirm, onCancel}) {
    return ReactDOM.createPortal(
        <div className="modal-backdrop">
            <div className="modal">
                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <Button name="Delete" color="red" onClick={onConfirm}/>
                    <Button name="Cancel" color="purple" onClick={onCancel}/>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default ConfirmModal;
