import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { resetProfile } from '../features/profile/profileSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetProfile());
        navigate('/login');
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {!isAuthenticated ? (
                        <>TUK NQMA NISHTO</>
                    ) : (
                        <>KAZAH TI</>
                    )}
                </Typography>
                {isAuthenticated && (
                    <>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                    <Button color="inherit">Home</Button>
                </Link>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                    <Button color="inherit">Profile</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;