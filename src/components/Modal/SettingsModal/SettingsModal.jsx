import './SettingsModal.css';
import CustomSelect from '../../CustomSelect/CustomSelect.jsx';
import Toggle from '../../Toggle/Toggle.jsx';
import {X} from 'lucide-react';

function SettingsModal({onClose, settings, onChange}) {
    return (
        <div className="modal-backdrop">
            <div className="settings-modal">
                <div className="modal-header">
                    <X size={20} onClick={onClose} className="close-icon"/>
                </div>

                <div className="modal-body">
                    {settings.selects.map((setting, idx) => (
                        <div key={idx} className="setting-row">
                            <label>{setting.label}</label>
                            <CustomSelect
                                key={idx}
                                value={setting.value}
                                onChange={(e) => onChange(setting.name, e.target.value)}
                                options={setting.options}
                            />
                        </div>
                    ))}

                    {settings.toggles.map((toggle, idx) => (
                        <div key={idx} className="setting-row">
                            <label>{toggle.label}</label>
                            <Toggle
                                isOn={toggle.value}
                                onToggle={() => onChange(toggle.name, !toggle.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;
