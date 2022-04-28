import { CSSProperties } from "react";

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
export const joinClasses = (...args: string[]) => args.filter(Boolean).join(' ');

export const waitAsync = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
