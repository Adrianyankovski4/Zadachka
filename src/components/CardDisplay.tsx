import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCard } from '../features/cards/cardsSlice';
import { RootState } from '../app/store';
import { t } from "../locale/translation";
import theme from "../theme";

interface Card {
    id: number;
    name: string;
    image?: string | null;
}

interface CardDisplayProps {
    searchTerm: string;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ searchTerm }) => {
    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) => state.cards);

    const filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        dispatch(deleteCard({ id }));
    };

    return (
        <div style={styles.container}>
            {filteredCards.length === 0 ? (
                <p style={styles.emptyMessage}>{t("noCards")}</p>
            ) : (
                <div style={styles.grid}>
                    {filteredCards.map((card) => (
                        <div key={card.id} style={styles.card}>
                            {card.image && (
                                <img src={card.image} alt={card.name} style={styles.image} />
                            )}
                            <h3 style={styles.name}>{card.name}</h3>
                            <button
                                onClick={() => handleDelete(card.id)}
                                style={styles.deleteButton}
                            >
                                {t("delete")}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center' as const,
    },
    emptyMessage: {
        fontSize: '18px',
        color: theme.palette.primary.main,
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '15px',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        textAlign: 'center' as const,
        width: '150px',
        flexShrink: 0,
    },
    image: {
        width: '100%',
        height: '100px',
        objectFit: 'cover' as const,
        borderRadius: '8px',
    },
    name: {
        margin: '10px 0',
        fontSize: '16px',
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#FF4C4C',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default CardDisplay;
