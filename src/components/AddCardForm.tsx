import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addCard } from '../features/cards/cardsSlice';
import { useLanguage } from "../context/LanguageContext";
import { t } from "../locale/translation";
import theme from "../theme";

interface AddCardFormProps {
    onClose: () => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const [cardName, setCardName] = useState<string>('');
    const [cardImage, setCardImage] = useState<string | null>(null);
    const { language } = useLanguage();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            dispatch(addCard({ name: cardName, image: cardImage }));
            setCardName('');
            setCardImage(null);
            onClose();
        } catch (error) {
            alert((error as Error).message);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.formContainer}>
                <button style={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <h2>{t("add_new_card")}</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder={t("cardName")}
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setCardImage(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)
                        }
                        style={styles.input}
                    />
                    <button type="submit" style={styles.submitButton}>
                        {t("addCard")}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '300px',
        position: 'relative' as const,
    },
    closeButton: {
        position: 'absolute' as const,
        top: '10px',
        right: '10px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '20px',
        cursor: 'pointer',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default AddCardForm;