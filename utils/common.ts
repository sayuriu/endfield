import { CSSProperties } from "react";
import { AvailableLanguages } from "@states/global";

export type Nullable<T> = T | null;
export type NullablePromise<T> = Promise<Nullable<T>>;

export type ExcludeProps<T, N> = {
    [P in keyof T]: T[P] extends N ? never : T[P];
}

export type ExcludeKey<T, K> = {
    [P in Exclude<keyof T, K>]: T[P];
}

export interface HasAnimation {
    dontAnimateChild?: Nullable<boolean>;
}
export interface OverridableStyle {
    overrideStyles?: CSSProperties;
}
export interface Logo {
    noLogoText?: Nullable<boolean>;
}

export const findNearestMultiple = (multiplier: number, target: number, isGreater = true) =>
    multiplier * Math[isGreater ? 'ceil' : 'floor'](target / multiplier);
export const nullTryReturn = <T, A>(action: (...args: A[]) => T, ...args: A[]): Nullable<T> => {
    try {
        return action(...args);
    } catch(_) {
        return null;
    }
};
export const localGet = (key: string): Nullable<string> => nullTryReturn((k) => localStorage.getItem(k), key);
export const localSet = (key: string, value: string): void => void nullTryReturn((k, v) => localStorage.setItem(k, v), key, value);
export const localRemove = (key: string): void => void nullTryReturn((k) => localStorage.removeItem(k), key);

export const whichWider = () => (window.innerWidth > window.innerHeight) ? 'width' : 'height';
export const joinClasses = (...classes: string[]) => classes.filter(Boolean).join(' ');
export const joinModuleClasses = (moduleStyle: Record<string, string>) => (...classes: string[]) => joinClasses(...classes.map(c => moduleStyle[c]));

export const wait = (ms: number) => { const timeout = Date.now() + ms; while (Date.now() < timeout) {} };
export const waitAsync = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
export const emptyFunc = () => {};

export type LanguagePack = {
    [K in 'en' | 'jp' | 'cn' | 'kr']: Record<string, any>;
}

export function i18n(key: string, lang = 'en', langPack: LanguagePack | Partial<LanguagePack>): string {
    const keys = key.split('.');
    if (!AvailableLanguages.includes(lang))
        lang = 'en';
    let data: Record<string, any> | undefined = langPack[lang as keyof typeof langPack];
    if (!data) return key;
    let level = 1;
    for (const subkey of keys)
    {
        if (typeof data![subkey] === 'string' && level === keys.length)
            return data![subkey];
        if (!(subkey in data!))
            break;
        data = data![subkey];
        level++;
    }
    return `{@${keys.copyWithin(0, 0, level).join('.')}}`;
}

export const useLocale = (lang: string, pack: LanguagePack | Partial<LanguagePack>) => (key: string) => i18n(key, lang, pack);
