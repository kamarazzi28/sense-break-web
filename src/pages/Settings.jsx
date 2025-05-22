import '../index.css';
import Title from "../components/Title/Title.jsx";
import FeatureRow from "../components/FeatureRow/FeatureRow.jsx";
import CustomSelect from "../components/CustomSelect/CustomSelect.jsx";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {ChevronRightIcon} from "lucide-react";

function Settings() {
    const [reminder, setReminder] = useState('');

    return (
        <>
            <Title name="General" text=""/>
            <div className="feature-group">
                <FeatureRow
                    title="Language"
                    description="Choose your preffered language"
                    rightElement={
                        <CustomSelect
                            value={reminder}
                            onChange={(e) => setReminder(e.target.value)}
                            options={[
                                {value: 'en', label: 'English'},
                                {value: 'cz', label: 'Czech'},
                            ]}
                            placeholder="English"
                        />
                    }
                />
            </div>
            <Title name="Account Security" text=""/>
            <div className="feature-group">
                <FeatureRow
                    title="Change Password"
                    description="Update your login password for better security"
                    rightElement={
                        <IconButton onClick={() => console.log('Navigate to account settings')}>
                            <ChevronRightIcon size={20}/>
                        </IconButton>
                    }
                />
                <FeatureRow
                    title="Recovery Email"
                    description="Update your login password for better security"
                    rightElement={
                        <IconButton onClick={() => console.log('Navigate to account settings')}>
                            <ChevronRightIcon size={20}/>
                        </IconButton>
                    }
                />
                <FeatureRow
                    title="Delete Account"
                    titleColor="#B3261E"
                    description="Permanently delete your account and all related data.  This action cannot be undone."
                    rightElement={
                        <IconButton onClick={() => console.log('Navigate to account settings')}>
                            <ChevronRightIcon size={20}/>
                        </IconButton>
                    }
                />
            </div>
        </>
    );
}

export default Settings;
