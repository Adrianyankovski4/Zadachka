import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { t } from "../locale/translation";
import { useLanguage } from "../context/LanguageContext";


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { language } = useLanguage();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        dispatch(login({ username, password }));
        if (sessionStorage.getItem('isAuthenticated') === 'true') {
            navigate('/');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                {t("login")}
            </Typography>
            <TextField
                label={t("username")}
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label={t("password")}
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                {t("LOGIN")}
            </Button>
        </Container>
    );
};

export default Login;