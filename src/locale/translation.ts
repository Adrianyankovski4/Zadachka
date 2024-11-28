type Translations = {
    [key: string]: string;
};

const translations: { [locale: string]: Translations } = {
    en: require("./en.json"),
    bg: require("./bg.json"),
};

let currentLanguage: string = "en";

export const setLanguage = (language: string) => {
    if (translations[language]) {
        currentLanguage = language;
    } else {
        console.warn(`Language "${language}" is not available.`);
    }
};

export const getLanguage = () => currentLanguage;

export const getFlagCode = (): string => {
    return currentLanguage === "en" ? "GB" : "BG";
};

export const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
};