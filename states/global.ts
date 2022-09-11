import { atom } from "jotai";
import { localSet, LanguagePack as _LanguagePack } from "@utils/common";

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
export const AvailableLanguages = ['en', 'cn', 'jp', 'kr'];

const LanguagePackAtom = atom<_LanguagePack>({
    en: {},
    cn: {},
    jp: {},
    kr: {},
});

export const LanguagePack = atom<_LanguagePack, Partial<_LanguagePack>, void>(
    (get) => get(LanguagePackAtom),
    (get, set, updatedPack) => {
        set(LanguagePackAtom, { ...get(LanguagePackAtom), ...updatedPack });
    }
);

const ImageDataAtom = atom<Map<string, string>>(new Map());
export const ImageData = atom<Map<string, string>, Map<string, string>, void>(
    (get) => get(ImageDataAtom),
    (get, set, newData) => {
        set(ImageDataAtom, newData);
    }
);

const IsPortraitAtom = atom(false);
export const IsPortrait = atom<boolean, boolean, void>(
    (get) => get(IsPortraitAtom),
    (get, set, isPortrait) => {
        set(IsPortraitAtom, isPortrait);
    }
);
