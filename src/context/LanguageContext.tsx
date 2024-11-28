import React, { createContext, useState, useContext, ReactNode } from "react";
import { setLanguage as setTranslationLanguage, getLanguage } from "../locale/translation";

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLang] = useState(getLanguage());

    const setLanguage = (lang: string) => {
        setLang(lang);
        setTranslationLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);