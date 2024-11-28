import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { resetProfile } from '../features/profile/profileSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags';
import { useLanguage } from "../context/LanguageContext";
import { t, getFlagCode } from "../locale/translation";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "bg" : "en";
        setLanguage(newLanguage);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetProfile());
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {t("application")}
                </Typography>
                {isAuthenticated && (
                    <>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                            <Button color="inherit">{t("home")}</Button>
                        </Link>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                            <Button color="inherit">{t("profile")}</Button>
                        </Link>
                        <Button color="inherit" onClick={handleLogout}>
                            {t("logout")}
                        </Button>
                    </>
                )}
                <IconButton onClick={toggleLanguage} color="inherit" sx={{ marginLeft: "auto" }}>
                    <Flag code={getFlagCode()} style={{ width: 24, height: 16 }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
