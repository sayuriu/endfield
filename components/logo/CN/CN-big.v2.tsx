import {HasAnimation, joinClasses, whichWider} from "@utils/common";
import {FC, useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import { AnimFunctions } from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import styles from "./CN-big.v2.module.scss";

export const LogoLarge_CN: FC<HasAnimation> = ({dontAnimateChild}) => {
    const mode = useRef("fh");
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => {
        mode.current = whichWider() === "width" ? "fw" : "fh";
    }, []);
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: dontAnimateChild ? 0 : 20,
            }}
            transition={{
                duration: isExiting ? 0.5 : 0.3,
                ease: Forceful
            }}
            data-logo={""}
            data-noanim={dontAnimateChild}
            className={joinClasses(styles.logo, mode.current, "abs")}
            viewBox="-42 -30 152 148"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id={styles["cn"]}>
                <g className={styles["arknights"]}>
                    <path className={joinClasses("_0", styles["char-1-1"])} d="M2.8,10.6879h1.5v-4.1h-2.4v4.7h0.9v-0.6zm0,-3.3h0.6v0.8h-0.6v-0.8zm0,1.6h0.6v0.8h-0.6v-0.8z"/>
                    <path className={joinClasses("_0", styles["char-1-2"])} d="M3.7,11.9879l0.8,0.6c0.576,-0.569,0.96,-1.303,1.1,-2.1h1.2v1h-1c0.146,0.318,0.246,0.655,0.3,1l1.3,-0.2c0.3,-0.2,0.4,-0.4,0.4,-0.9v-4.9h-3v2.4c0.061,0.566,-0.007,1.139,-0.197,1.675c-0.191,0.537,-0.499,1.024,-0.903,1.425m2,-4.6h1.1v0.6h-1.1v-0.6zm0,1.5h1.1v0.7h-1.1v-0.7z"/>
                    <path className={joinClasses("_1", styles["char-2"])} d="M9.4,11.9879h2.8v0.5h1v-5.9h-4.8v5.9h1v-0.5zm0,-4.4h2.8v1.2h-2.8v-1.2zm0,2.2h2.8v1.3h-2.8v-1.3z"/>
                    <path className={joinClasses("_2", styles["char-3"])} d="M13.7,11.7879c0.284,0.218,0.522,0.49,0.7,0.8c0.512,-0.288,0.949,-0.691,1.279,-1.177c0.33,-0.486,0.542,-1.041,0.621,-1.623h2c-0.1,1,-0.2,1.6,-0.4,1.7h-1.5c0.218,0.293,0.356,0.638,0.4,1h1.1c0.337,-0.028,0.654,-0.169,0.9,-0.4c0.359,-0.888,0.53,-1.842,0.5,-2.8v-0.4h-2.9c0.075,-0.226,0.109,-0.463,0.1,-0.7h3.4v-1h-2.7l0.4,-0.2l-0.5,-0.9l-0.9,0.4l0.3,0.7h-2.7v1h1.6c0.089,0.7,-0.023,1.41,-0.325,2.048c-0.301,0.638,-0.778,1.176,-1.375,1.552z"/>
                    <path className={joinClasses("_3", styles["char-4"])} d="M19.8,9.98793h0.8c-0.022,0.37,-0.122,0.73,-0.295,1.058c-0.172,0.328,-0.413,0.615,-0.705,0.842c0.328,0.152,0.605,0.395,0.8,0.7c0.715,-0.683,1.144,-1.613,1.2,-2.6h2.5v1.5h-0.8c0.085,0.305,0.185,0.605,0.3,0.9h1.1c0.3,-0.2,0.4,-0.4,0.4,-0.9v-1.5h0.8v-0.9h-0.8v-2.1h-2c0.17,-0.21,0.305,-0.447,0.4,-0.7h-1.2c-0.031,0.274,-0.098,0.543,-0.2,0.8h-1.4v2h-0.9v0.9zm4.3,-2.2v1.3h-1l0.5,-0.5l-0.9,-0.8h1.4zm-2.4,1v-1h0.9l-0.6,0.5l0.9,0.8h-1.2v-0.3zm0.3,1.5c0.409,0.244,0.78,0.547,1.1,0.9l0.6,-0.6c-0.33,-0.237,-0.704,-0.407,-1.1,-0.5l-0.6,0.2z"/>
                </g>
                <g className={styles["endfield"]}>
                    <g className={styles["char-1"]}>
                        <path id={styles["main-t"]} d="M12.3,20.8879v-1.3h-2.1l-8.7,11.4v3.7h11.9l8.9,-6.2l10.1,6.9v-5.4l-6.3,-4.2l5.5,-3.8v-5.578h-10.391l1.991,-2.522h-5.6l-5.3,7z"/>
                        <path id={styles["main-t-inner-l"]} d="M12.5,29.8879l-3.4,0l2.5,-3.5l2.3,0l1.8,-2.5l2.7,1.9l-5.9,4.1z" data-inverse=""/>
                        <path id={styles["main-t-inner-r"]} d="M21.95,22.7879l-3.05,-1.7h6.2l-3.15,1.7z" data-inverse=""/>
                        <path id={styles["main-b"]} d="M12.3,43.6879v-7.8h2.5l3.285,-2.4l10.3,7l3.72,-2.628v5.792h-7.434l-7.866,-5.554v5.6"/>
                        <path id={styles["stroke-tl-1"]} d="M12.7,13.8879h-6l-5.1,6.8v6.1h1.4l9.7,-12.9z" stroke="white" strokeWidth="0.15"/>
                        <path id={styles["stroke-bl-1"]} d="M6,35.8879h-4.6v7.8h4.6v-7.8z" stroke="white" strokeWidth="0.15"/>
                        <path id={styles["stroke-bl-2"]} d="M11.6,35.8879h-4.7v7.8h4.6l0.1,-7.8z" stroke="white" strokeWidth="0.15"/>
                        <path id={styles["stroke-br-1"]} d="M22.5,29.7879l-3.8,2.9l9.2,6.5v-5.7l-5.4,-3.7z" stroke="white" strokeWidth="0.15"/>
                    </g>
                    <g className={styles["char-2"]}>
                        <path className={styles["main"]} d="M31.6 16.4161H44.305V13.6161H49.995V16.4161H62.7V21.0161H49.995V23.9161H59.795V28.5161H49.995V29.4161L62.495 38.0661V43.8661L49.995 34.9661V43.6134H44.305V35.0761L32.105 43.6561V37.8561L44.305 29.4061V28.5061H34.505V23.9061H44.305V21.0061H31.6"/>
                        <path className={styles["fragment-l"]} d="M31.6 16.4161H44.305V13.6161H49.995V16.4161H62.7V21.0161H49.995V23.9161H59.795V28.5161H49.995V29.4161L62.495 38.0661V43.8661L49.995 34.9661V43.6134H44.305V35.0761L32.105 43.6561V37.8561L44.305 29.4061V28.5061H34.505V23.9061H44.305V21.0061H31.6"/>
                        <path className={styles["fragment-r"]} d="M31.6 16.4161H44.305V13.6161H49.995V16.4161H62.7V21.0161H49.995V23.9161H59.795V28.5161H49.995V29.4161L62.495 38.0661V43.8661L49.995 34.9661V43.6134H44.305V35.0761L32.105 43.6561V37.8561L44.305 29.4061V28.5061H34.505V23.9061H44.305V21.0061H31.6"/>
                        <rect className={styles["corner-o"]} x="75.9875" y="13.6161" width="13.2875" height="13.147" transform="rotate(-180 75.9875 13.6161)"/>
                        <rect className={styles["corner-i"]} x="72.4887" y="10.149" width="6.29" height="6.21295" transform="rotate(-180 72.4887 10.149)" stroke="black" strokeWidth="2"/>
                    </g>
                    <g className={styles["char-3"]}>
                        <path className={styles["l"]} d="M11.5 51.0879H8.6V45.2879H3.4V51.0879H1V55.6879H3.4V64.0879L0.300003 65.1879V71.6879L11.5 67.5879V61.0879L8.6 62.1879V55.6879H11.5V51.0879Z" stroke="white" strokeWidth="0.15"/>
                        <path className={styles["r"]} d="M10.1 55.6879V60.9879L12.7 59.9879V71.4879L17.2 73.7879H32.3V69.0879H18V57.9879L19.2 57.4879V67.9879L24.4 65.7879V55.4879L25.8 54.9879V65.2879L31 63.1879V47.3879L24.4 49.8879V43.7879H19.2V51.8879L18 52.3879V47.0879H12.7V54.3879L11.5 54.8879" stroke="white" strokeWidth="0.15"/>
                    </g>
                </g>
            </g>

            <rect className={styles["cover"]} x="0" y="73.4" width="33.1" height="30.1" data-inverse=""/>
            <rect className={styles["cover-char-3"]} x="0" y="43.7" width="33.1" height="30.1" data-inverse=""/>
            <rect id={styles["inverse"]} fill="white" x="0" y="43.83" width="33.1" height="30.1"/>
            <path className={styles["en-square"]} d="M62.4 43.688H32.3V73.788H62.4V43.688Z" stroke="white" strokeWidth="0.15"/>
            <g id={styles["en"]}>
                <g className={styles["arknights"]}>
                    <path className={styles["a"]} d="M35.6 64.388H36.3L37.6 67.588H36.8L36.6 67.088H35.5L35.3 67.588H34.5L35.6 64.388Z"/>
                    <path className={styles["a-inner"]} d="M35.62 66.588L36.02 65.388L36.47 66.588H35.62Z" data-inverse=""/>
                    <path className={styles["r"]} d="M37.9 64.388H39.1C39.9 64.388 40.4 64.788 40.4 65.488C40.3968 65.6797 40.3386 65.8665 40.2322 66.0261C40.1258 66.1857 39.9758 66.3113 39.8 66.388L40.5 67.588H39.7L39.1 66.588H38.7V67.588H37.9V64.388Z"/>
                    <path className={styles["r-inner"]} d="M39.6 65.488C39.6 65.3819 39.5579 65.2801 39.4829 65.2051C39.4078 65.1301 39.3061 65.088 39.2 65.088H38.7V65.888H39.2C39.3061 65.888 39.4078 65.8458 39.4829 65.7708C39.5579 65.6958 39.6 65.5941 39.6 65.488V65.488Z" data-inverse=""/>
                    <path className={styles["k"]} d="M41.65 66.488V67.588H40.85V64.388H41.65V65.588L42.05 65.088L42.85 64.388H43.85L42.45 65.688L43.85 67.588H42.95L41.95 66.288L41.65 66.488Z"/>
                    <path className={styles["n"]} d="M44.1 64.388H44.8L45.5 65.288L46.2 66.288H46.3C46.238 65.8909 46.2046 65.4898 46.2 65.088V64.388H47V67.588H46.3L45.6 66.688L44.9 65.688V67.588H44.1V64.388Z"/>
                    <path className={styles["i"]} d="M47.4 64.388H48.2V67.588H47.4V64.388Z"/>
                    <path className={styles["g"]} d="M48.52 65.988C48.5053 65.7609 48.5392 65.5333 48.6194 65.3204C48.6997 65.1075 48.8244 64.9141 48.9853 64.7532C49.1462 64.5924 49.3395 64.4676 49.5525 64.3874C49.7654 64.3072 49.9929 64.2733 50.22 64.288C50.5161 64.283 50.8071 64.3658 51.0563 64.526C51.3054 64.6861 51.5016 64.9165 51.62 65.188L50.82 65.388C50.7531 65.2917 50.6631 65.2138 50.5583 65.1614C50.4534 65.109 50.3371 65.0837 50.22 65.088C49.9813 65.088 49.7524 65.1828 49.5836 65.3516C49.4148 65.5203 49.32 65.7493 49.32 65.988C49.32 66.2267 49.4148 66.4556 49.5836 66.6244C49.7524 66.7931 49.9813 66.888 50.22 66.888C50.72 66.888 51.02 66.688 51.02 66.388H50.22V65.788H51.72V67.588H51.02V67.388C50.92 67.588 50.52 67.688 50.22 67.688C49.9929 67.7027 49.7654 67.6688 49.5525 67.5885C49.3395 67.5083 49.1462 67.3836 48.9853 67.2227C48.8244 67.0618 48.6997 66.8684 48.6194 66.6555C48.5392 66.4426 48.5053 66.215 48.52 65.988"/>
                    <path className={styles["h"]} d="M54.1 65.588V64.388H54.9V67.588H54.1V66.388H52.9V67.588H52.1V64.388H52.9V65.588H54.1Z"/>
                    <path className={styles["t"]} d="M56.8 67.588H56.1V65.088H55.1V64.388H57.8V65.088H56.8V67.588Z"/>
                    <path className={styles["s"]} d="M58.72 66.188C58.507 66.1452 58.3137 66.0343 58.1694 65.8719C58.025 65.7095 57.9375 65.5045 57.92 65.288C57.9326 65.1433 57.9736 65.0025 58.0409 64.8738C58.1081 64.7451 58.2001 64.631 58.3117 64.538C58.4232 64.445 58.5521 64.3751 58.6908 64.3322C58.8296 64.2892 58.9754 64.2742 59.12 64.288C59.3925 64.2794 59.6598 64.3638 59.878 64.5274C60.0961 64.691 60.252 64.9239 60.32 65.188L59.62 65.388C59.6081 65.3217 59.583 65.2585 59.5461 65.2022C59.5091 65.1458 59.4612 65.0975 59.4052 65.0602C59.3492 65.0228 59.2862 64.9972 59.22 64.9848C59.1538 64.9724 59.0858 64.9734 59.02 64.988C58.82 64.988 58.72 65.088 58.72 65.188C58.72 65.288 59.02 65.488 59.42 65.688C59.82 65.888 60.42 66.088 60.42 66.688C60.42 67.288 59.92 67.688 59.12 67.688C58.8086 67.7009 58.5019 67.6095 58.2483 67.4284C57.9947 67.2473 57.8088 66.9867 57.72 66.688L58.52 66.488C58.62 66.688 58.82 66.988 59.12 66.988C59.42 66.988 59.52 66.888 59.52 66.688C59.52 66.488 59.22 66.388 58.72 66.188"/>
                </g>
                <g className={styles["endfield"]}>
                    <path className={styles["e-1"]} d="M37.3 72.188H34.4V68.388H37.3V69.188H35.4V69.888H36.8V70.688H35.4V71.388H37.3V72.188Z"/>
                    <path className={styles["n_2"]} d="M41.3 72.188H40.4L39.6 71.188L38.8 69.888C38.7 69.888 38.8 70.488 38.8 71.388V72.188H37.8V68.388H38.7L39.5 69.488L40.4 70.588V68.388H41.3V72.188Z"/>
                    <path className={styles["d-1"]} d="M43.6 72.188H41.9V68.388H43.6C43.8578 68.3744 44.1157 68.4135 44.3578 68.5028C44.6 68.5922 44.8215 68.73 45.0086 68.9078C45.1958 69.0856 45.3447 69.2997 45.4464 69.537C45.5481 69.7743 45.6004 70.0298 45.6 70.288C45.6004 70.5461 45.5481 70.8016 45.4464 71.0389C45.3447 71.2762 45.1958 71.4903 45.0086 71.6681C44.8215 71.8459 44.6 71.9837 44.3578 72.0731C44.1157 72.1625 43.8578 72.2016 43.6 72.188Z"/>
                    <path className={styles["d-1-inner"]} d="M43.6 69.188H42.8V71.388H43.6C43.7402 71.3887 43.8789 71.3599 44.0073 71.3035C44.1356 71.2471 44.2506 71.1644 44.3449 71.0606C44.4392 70.9569 44.5107 70.8345 44.5546 70.7014C44.5985 70.5683 44.614 70.4274 44.6 70.288C44.6011 70.0127 44.4991 69.7471 44.3139 69.5435C44.1288 69.3398 43.8741 69.213 43.6 69.188" data-inverse=""/>
                    <path className={styles["f"]} d="M48.5 69.188H46.8V69.988H48.2V70.788H46.8V72.188H45.9V68.388H48.6L48.5 69.188Z"/>
                    <path className={styles["i_2"]} d="M49.95 72.188H49.05V68.388H49.95V72.188Z"/>
                    <path className={styles["e-2"]} d="M53.3 72.188H50.5V68.388H53.3V69.188H51.4V69.888H52.9V70.688H51.4V71.388H53.3V72.188Z"/>
                    <path className={styles["l_2"]} d="M56.6 72.188H53.9V68.388H54.8V71.388H56.6V72.188Z"/>
                    <path className={styles["d-2"]} d="M58.6 72.188H56.9V68.388H58.6C58.8578 68.3744 59.1157 68.4135 59.3578 68.5028C59.6 68.5922 59.8215 68.73 60.0086 68.9078C60.1958 69.0856 60.3447 69.2997 60.4464 69.537C60.5481 69.7743 60.6004 70.0298 60.6 70.288C60.6004 70.5461 60.5481 70.8016 60.4464 71.0389C60.3447 71.2762 60.1958 71.4903 60.0086 71.6681C59.8215 71.8459 59.6 71.9837 59.3578 72.0731C59.1157 72.1625 58.8578 72.2016 58.6 72.188Z"/>
                    <path className={styles["d-2-inner"]} d="M58.6 69.188H57.8V71.388H58.6C58.7402 71.3887 58.8789 71.3599 59.0073 71.3035C59.1356 71.2471 59.2506 71.1644 59.3449 71.0606C59.4392 70.9569 59.5107 70.8345 59.5546 70.7014C59.5985 70.5683 59.614 70.4274 59.6 70.288C59.6011 70.0127 59.4991 69.7471 59.3139 69.5435C59.1288 69.3398 58.8741 69.213 58.6 69.188" data-inverse=""/>
                </g>
            </g>
        </motion.svg>
    );
};
