import '../index.css';
import Title from "../components/Title/Title.jsx";
import FeatureRow from "../components/FeatureRow/FeatureRow.jsx";
import Toggle from "../components/Toggle/Toggle.jsx";
import CustomSelect from "../components/CustomSelect/CustomSelect.jsx";
import {useState} from "react";

function Notifications() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [communicationsEmailsEnabled, setCommunicationsEmailsEnabled] = useState(true);
    const [updatesEnabled, setUpdatesEnabled] = useState(true);
    const [allNotificationsDisabled, setAllNotificationsDisabled] = useState(true);
    const [reminder, setReminder] = useState('');

    return (
        <>
            <Title name="Notifications" text=""/>
            <div className="feature-group">
                <FeatureRow
                    title="Enable Desktop Notifications"
                    description="Get friendly reminders to take eye breaks or start a new session"
                    rightElement={
                        <Toggle
                            isOn={notificationsEnabled}
                            onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
                        />
                    }
                />
                <FeatureRow
                    title="Set Reminder"
                    description="Choose how often you'd like to be reminded during the day"
                    rightElement={
                        <CustomSelect
                            value={reminder}
                            onChange={(e) => setReminder(e.target.value)}
                            options={[
                                {value: '30', label: 'Every 30 min'},
                                {value: '60', label: 'Every hour'},
                                {value: '180', label: 'Every 3 hours'},
                            ]}
                            placeholder="Choose Time"
                        />
                    }
                />
            </div>
            <Title name="Email Notifications" text=""/>
            <div className="feature-group">
                <FeatureRow
                    title="Communications Emails"
                    description="Receive monthly overviews of your training progress"
                    rightElement={
                        <Toggle
                            isOn={communicationsEmailsEnabled}
                            onToggle={() => setCommunicationsEmailsEnabled(!communicationsEmailsEnabled)}
                        />
                    }
                />
                <FeatureRow
                    title="Announcements & Updates"
                    description="Be the first to know about new features and improvements"
                    rightElement={
                        <Toggle
                            isOn={updatesEnabled}
                            onToggle={() => setUpdatesEnabled(!updatesEnabled)}
                        />
                    }
                />
            </div>
            <Title name="Sounds" text=""/>
            <div className="feature-group">
                <FeatureRow
                    title="Disable All Notification Sounds"
                    description="Turn off all audio alerts and reminders"
                    rightElement={
                        <Toggle
                            isOn={allNotificationsDisabled}
                            onToggle={() => setAllNotificationsDisabled(!allNotificationsDisabled)}
                        />
                    }
                />
            </div>
        </>
    )
}

export default Notifications;