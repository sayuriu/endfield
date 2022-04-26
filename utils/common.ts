import {CSSProperties} from "react";

export const whichWider = () => (window.innerWidth > window.innerHeight) ? 'width' : 'height';
export const joinClasses = (...args: string[]) => args.filter(Boolean).join(' ');

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
