import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { updateProfile } from '../features/profile/profileSlice';
import { TextField, Button, Container, Typography, Avatar } from '@mui/material';
import {useLanguage} from "../context/LanguageContext";
import { t } from "../locale/translation"

const Profile: React.FC = () => {
    const profile = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch();
    const [form, setForm] = useState({ ...profile });
    const { language } = useLanguage();

    useEffect(() => {
        setForm(profile);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setForm({ ...form, avatar: reader.result.toString() });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        dispatch(updateProfile(form));
        alert('Profile updated successfully!');
    };

    return (
        <Container>
            <Typography variant="h4">
                {t("edit_profile")}
            </Typography>
            <Avatar src={form.avatar} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Button variant="contained" color="secondary" component="label" sx={{ marginBottom: 2 }}>
                {t("change_picture")}
                <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </Button>
            <TextField
                label={t("name")}
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label={t("age")}
                name="age"
                value={form.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label={t("bio")}
                name="bio"
                value={form.bio}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                {t("save")}
            </Button>
        </Container>
    );
};

export default Profile;