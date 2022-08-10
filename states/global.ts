import { atom } from "jotai";
import { localSet } from "@utils/common";

const LanguageAtom = atom<string>("en");
export const Language = atom<string, string, void>(
    (get) => get(LanguageAtom),
    (get, set, newLang) => {
        if ("localStorage" in window) {
            localSet("preferredLanguage", newLang);
        }
        set(LanguageAtom, newLang);
    },
);
export const AvailableLanguages = ['en', 'cn', 'jp'];
