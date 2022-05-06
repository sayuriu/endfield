import { atom } from "jotai";

const LanguageAtom = atom<string>("en");
export const Language = atom<string, string, void>(
    (get) => get(LanguageAtom),
    (get, set, newLang) => {
        if (window.localStorage) {
            window.localStorage.setItem("preferredLanguage", newLang);
        }
        set(LanguageAtom, newLang);
    },
);
export const AvailableLanguages = ['en', 'cn', 'jp'];
