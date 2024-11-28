import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Typography, Container, Avatar } from '@mui/material';
import { t } from "../locale/translation";
import { useLanguage } from "../context/LanguageContext";

const Home: React.FC = () => {
    const profile = useSelector((state: RootState) => state.profile);
    const { language } = useLanguage();

    return (
        <Container>
            <Typography variant="h4">{t("welcome")}, {profile.name}!</Typography>
            <Avatar src={profile.avatar} sx={{ width: 100, height: 100, marginTop: 2 }} />
            <Typography>{t("age")}: {profile.age}</Typography>
            <Typography>{t("bio")}: {profile.bio}</Typography>
        </Container>
    );
};

export default Home;
