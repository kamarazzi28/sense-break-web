import './ConfirmModal.css';
import Button from '../Button/Button.jsx';

function ConfirmModal({title, message, onConfirm, onCancel}) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <Button name="Delete" color="red" onClick={onConfirm}/>
                    <Button name="Cancel" color="purple" onClick={onCancel}/>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
