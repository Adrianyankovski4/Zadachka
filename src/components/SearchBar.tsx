import React, { useState, useEffect } from 'react';
import { useLanguage } from "../context/LanguageContext";
import { t } from "../locale/translation";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState(value);
    const { language } = useLanguage();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onChange(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, onChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder || t("search_cards")}
            style={styles.searchBar}
        />
    );
};

const styles = {
    searchBar: {
        padding: '10px',
        width: '100%',
        maxWidth: '400px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
};

export default SearchBar;


