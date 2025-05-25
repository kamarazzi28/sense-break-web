import '../index.css';
import Title from '../components/Title/Title.jsx';
import Input from '../components/InputFields/Input.jsx';
import Button from '../components/Button/Button.jsx';
import {useState} from 'react';
import dayjs from 'dayjs';
import CustomSelect from "../components/CustomSelect/CustomSelect.jsx";
import DatePicker from "../components/DatePicker/DatePicker.jsx";

function AccountSettings() {
    const [username, setUsername] = useState('Kami');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (username.length < 2) newErrors.username = 'Name must be at least 2 characters';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log('Saved:', {username, gender, dateOfBirth, location});
    };

    const handleDiscard = () => {
        setUsername('Kamilla');
        setGender('Female');
        setLocation('Prague, Czechia');
        setDateOfBirth(dayjs('2001-03-28'));
    };

    return (
        <>
            <Title name="Account Settings" text=""/>
            <div className="account-settings-container">
                <div className="account-group">
                    <div className="account-avatar-box">
                        <img src="/images/figures/avatar_placeholder.svg" alt="Avatar" className="avatar-preview"/>
                        <Button name="Delete Avatar" color="secondary"/>
                        <Button name="Upload New" color="purple"/>
                        <div className="logout-button">
                            <Button name="Log Out" color="red"/>
                        </div>
                    </div>
                </div>

                <div className="account-group">
                    <form className="account-form" onSubmit={handleSubmit}>
                        <div className="input-pair">
                            <Input
                                label="Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={errors.username}
                                variant="outlined"
                                placeholder="Your Name"
                            />
                            <CustomSelect
                                label="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                options={[
                                    {value: 'Female', label: 'Female'},
                                    {value: 'Male', label: 'Male'},
                                    {value: 'Other', label: 'Other'}
                                ]}
                                placeholder="Not selected"
                                variant="input"
                            />
                        </div>
                        <div className="input-pair">
                            <DatePicker
                                label="Date of Birth"
                                value={dateOfBirth}
                                onChange={(newValue) => setDateOfBirth(newValue)}
                            />
                            <CustomSelect
                                label="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                options={[
                                    {value: 'Prague, Czechia', label: 'Prague, Czechia'},
                                    {value: 'Brno, Czechia', label: 'Brno, Czechia'},
                                    {value: 'Ostrava, Czechia', label: 'Ostrava, Czechia'},
                                    {value: 'Berlin, Germany', label: 'Berlin, Germany'},
                                    {value: 'Munich, Germany', label: 'Munich, Germany'},
                                    {value: 'Vienna, Austria', label: 'Vienna, Austria'},
                                    {value: 'Warsaw, Poland', label: 'Warsaw, Poland'},
                                    {value: 'Krakow, Poland', label: 'Krakow, Poland'},
                                    {value: 'Paris, France', label: 'Paris, France'},
                                    {value: 'Lyon, France', label: 'Lyon, France'},
                                    {value: 'Rome, Italy', label: 'Rome, Italy'},
                                    {value: 'Milan, Italy', label: 'Milan, Italy'},
                                    {value: 'Barcelona, Spain', label: 'Barcelona, Spain'},
                                    {value: 'Madrid, Spain', label: 'Madrid, Spain'},
                                    {value: 'London, UK', label: 'London, UK'},
                                    {value: 'Manchester, UK', label: 'Manchester, UK'},
                                    {value: 'New York, USA', label: 'New York, USA'},
                                    {value: 'Los Angeles, USA', label: 'Los Angeles, USA'},
                                    {value: 'Toronto, Canada', label: 'Toronto, Canada'},
                                    {value: 'Other', label: 'Other'},
                                ]}
                                placeholder="Not selected"
                                variant="input"
                            />
                        </div>
                        <div className="input-pair">
                            <Input
                                label="Email"
                                helper="Email is linked to account and can’t be changed"
                                variant="disabled"
                                placeholder="ki28032000@gmail.com"
                            />
                            <Input
                                label="Password"
                                helper="To change password go to settings"
                                variant="disabled"
                                placeholder="************"
                            />
                        </div>
                        <div className="button-row">
                            <Button name="Discard Changes" color="red" type="button" onClick={handleDiscard}/>
                            <Button name="Save Changes" color="purple" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AccountSettings;
