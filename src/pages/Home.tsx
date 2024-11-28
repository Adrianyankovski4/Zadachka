import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Typography, Container, Button } from '@mui/material';
import { t } from "../locale/translation";
import { useLanguage } from "../context/LanguageContext";
import AddCardForm from '../components/AddCardForm';
import CardDisplay from '../components/CardDisplay';

const Home: React.FC = () => {
    const profile = useSelector((state: RootState) => state.profile);
    const { language } = useLanguage();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {t("welcome")}, {profile.name}!
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsFormOpen(true)}
                style={{ marginBottom: '20px' }}
            >
                {t("addCard")}
            </Button>

            {isFormOpen && <AddCardForm onClose={() => setIsFormOpen(false)} />}

            <div style={styles.cardDisplayContainer}>
                <CardDisplay />
            </div>
        </Container>
    );
};

const styles = {
    cardDisplayContainer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
};

export default Home;
