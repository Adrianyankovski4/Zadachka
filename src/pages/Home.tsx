import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Typography, Container, Button } from '@mui/material';
import { t } from "../locale/translation";
import { useLanguage } from "../context/LanguageContext";
import AddCardForm from '../components/AddCardForm';
import CardDisplay from '../components/CardDisplay';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
    const profile = useSelector((state: RootState) => state.profile);
    const { language } = useLanguage();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {t('welcome')}, {profile.name}!
            </Typography>

            <div style={styles.topContainer}>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setIsFormOpen(true)}
                    >
                        {t('addCard')}
                    </Button>

                {isFormOpen && <AddCardForm onClose={() => setIsFormOpen(false)} />}

                <div style={styles.searchBarContainer}>
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>
            </div>

            <div style={styles.cardDisplayContainer}>
                <CardDisplay searchTerm={searchTerm}/>
            </div>
        </Container>
    );
};


const styles = {
    topContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    searchBarContainer: {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
    },
    cardDisplayContainer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'left',
    },
};

export default Home;
