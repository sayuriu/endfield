import { CSSProperties } from "react";
import lang_en from "@lang/en.json";
import lang_cn from "@lang/cn.json";
import lang_jp from "@lang/jp.json";
import { AvailableLanguages } from "@states/global";

export type Nullable<T> = T | null;
export type NullablePromise<T> = Promise<Nullable<T>>;

export interface HasAnimation {
    dontAnimateChild?: Nullable<boolean>;
}
export interface OverridableStyle {
    overrideStyles?: CSSProperties;
}
export interface Logo {
    noLogoText?: Nullable<boolean>;
}

export const localGet = (key: string): Nullable<string> => localStorage.getItem(key);
export const localSet = (key: string, value: string): void => localStorage.setItem(key, value);
export const localRemove = (key: string): void => localStorage.removeItem(key);
export const whichWider = () => (window.innerWidth > window.innerHeight) ? 'width' : 'height';
export const joinClasses = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const wait = (ms: number) => { const timeout = Date.now() + ms; while (Date.now() < timeout) {} };
export const waitAsync = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
export const emptyFunc = () => {};

const lang_map = {
    en: lang_en,
    cn: lang_cn,
    jp: lang_jp,
};

export function i18n(key: string, lang= 'en'): string {
    const keys = key.split('.');
    if (!AvailableLanguages.includes(lang))
        lang = 'en';
    let data: Record<string, any> = lang_map[lang as keyof typeof lang_map];
    let level = 1;
    for (const subkey of keys)
    {
        if (typeof data[subkey] === 'string' && level === keys.length)
            return data[subkey];
        if (!Object.hasOwn(data, subkey))
            break;
        data = data[subkey];
        level++;
    }
    return `{@${keys.copyWithin(0, level).join('.')}}`;
}

export const useLocale = (lang: string) => (key: string) => i18n(key, lang);
