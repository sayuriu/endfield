import {HasAnimation, joinClasses, whichWider} from "@utils/common";
import {FC, useEffect, useRef, useState} from "react";
import styles from "@components/logo/CN/CN-big.module.scss";
import { motion } from "framer-motion";
import {AnimFunctions} from "@utils/anims";
import Forceful = AnimFunctions.Forceful;

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
            viewBox="-90 -55 242.8 181"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path className={joinClasses(styles["arknights-cn"], "_0")} id={styles["arknights-cn-chr1-1"]} d="M2.5,4.6H4V.5H1.6V5.2h.9Zm0-3.3h.6v.8H2.5Zm0,1.6h.6v.8H2.5Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_0")} id={styles["arknights-cn-chr1-2"]} d="M3.4,5.9l.8.6A3.9,3.9,0,0,0,5.3,4.4H6.5v1h-1a3.8,3.8,0,0,1,.3,1l1.3-.2c.3-.2.4-.4.4-.9V.4h-3V2.8A3.8,3.8,0,0,1,3.4,5.9m2-4.6H6.5v.6H5.4Zm0,1.5H6.5v.7H5.4V2.8"/>
            <path className={joinClasses(styles["arknights-cn"], "_1")} id={styles["arknights-cn-chr2"]} d="M9.1,5.9h2.8v.5h1V.5H8.1V6.4h1Zm0-4.4h2.8V2.7H9.1Zm0,2.2h2.8V5H9.1Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_2")} id={styles["arknights-cn-chr3"]} d="M13.4,5.7a2.7,2.7,0,0,1,.7.8A3.8,3.8,0,0,0,16,3.7h2c-.1,1-.2,1.6-.4,1.7H16.1a2.1,2.1,0,0,1,.4,1h1.1a1.5,1.5,0,0,0,.9-.4A6.9,6.9,0,0,0,19,3.2V2.8H16.1a2,2,0,0,0,.1-.7h3.4v-1H16.9l.4-.2L16.8,0l-.9.4.3.7H13.5v1h1.6a3.7,3.7,0,0,1-1.7,3.6"/>
            <path className={joinClasses(styles["arknights-cn"], "_3")} id={styles["arknights-cn-chr4"]} d="M19.5,3.9h.8a2.6,2.6,0,0,1-1,1.9,1.9,1.9,0,0,1,.8.7,3.9,3.9,0,0,0,1.2-2.6h2.5V5.4H23a9.4,9.4,0,0,0,.3.9h1.1c.3-.2.4-.4.4-.9V3.9h.8V3h-.8V.9h-2a2.5,2.5,0,0,0,.4-.7H22a3.1,3.1,0,0,1-.2.8H20.4v2h-.9Zm4.3-2.2V3h-1l.5-.5-.9-.8Zm-2.4,1V1.7h.9l-.6.5.9.8H21.4Zm0.3,1.5a4.8,4.8,0,0,1,1.1.9l.6-.6A3.1,3.1,0,0,0,22.3,4Z"/>

            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t"]} d="M12,14.8v-1.3h-2.1L1.2,24.9v3.7H13.1L22,22.4l10.1,6.9V23.9l-6.3-4.2,5.6-3.8V10.4h-10.5l2,-2.6h-5.6Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t-inner-l"]} data-inverse={""} d="M12.2,23.8H8.8l2.5-3.5h2.3l1.8-2.5,2.7,1.9Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t-inner-r"]} data-inverse={""} d="M21.85,16.7l-3.25,-1.7h6.2Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-b"]} d="M12,37.6v-7.8h2.5l3.285,-2.4l10.3,7l3.85,-2.68v5.75h-7.46l-7.88,-5.59v5.6Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-tl-1"]} d="M12.4,7.8h-6L1.3,14.6v6.1H2.7Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-bl-1"]} d="M5.7,29.8H1.1v7.8H5.7Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-bl-2"]} d="M11.3,29.8H6.6v7.8h4.6Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-br-1"]} d="M22.2,23.7l-3.8,2.9,9.2,6.5V27.4Z"/>
            <path className={joinClasses(styles["endfield-cn"])}                 id={styles["endfield-cn-chr2"]} d="M31.3,10.4h12.705v-2.8h5.69v2.8h12.705v4.6h-12.705v2.9h9.8v4.6h-9.8v.9l12.5,8.65v5.8l-12.5,-8.9v8.8h-5.69v-8.69l-12.2,8.53v-5.75l12.2,-8.45v-.9h-9.8v-4.6h9.8v-2.9h-12.705"/>

            <g className={styles["endfiled-cn chr3"]} id={styles["endfield-cn-chr3"]}>
                <path className={styles["endfield-cn"]} id={styles["endfield-cn-chr3-1"]} d="M11.2,45H8.3V39.2H3.1V45H.7v4.6H3.1V58L0,59.1v6.5l11.2-4.1V55L8.3,56.1V49.6H11.2Z"/>
                <path className={styles["endfield-cn"]} id={styles["endfield-cn-chr3-2"]} d="M9.8,49.6v5.3l2.6-1V65.4l4.5,2.3H32.1V63H17.8V51.9l1.2-.5V61.9l5.2-2.2V49.4l1.4-.5V59.2l5.2-2.1V41.3l-6.6,2.5V37.7H18.9v8.1l-1.2.5V41H12.4v7.3Z"/>
            </g>
            <rect className={styles["cover"]} x="0" y="67.75" width="32.1" height="30.1"/>
            <rect id={styles["rect-inverse"]} fill="white" x="0" y="37.75" width="32" height="30"/>

            <rect id={styles["en-square"]} x="32" y="37.6" width="30.45" height="30.1"/>

            <path className={joinClasses(styles["arknights"], "_0")} id={styles["arknights-a"]} data-inverse={""} d="M35.3,58.3h.7l1.3,3.2h-.8l-.2-.5H35.2l-.2.5h-.8Z"/>
            <path className={joinClasses(styles["arknights"], "_0")} id={styles["arknights-a-inner"]} d="M35.32,60.3l.4,-1.2l.45,1.2Z"/>
            <path className={joinClasses(styles["arknights"], "_1")} id={styles["arknights-r"]} data-inverse={""} d="M37.6,58.3h1.2c.8,0,1.3.4,1.3,1.1a1,1,0,0,1-.6.9l.7,1.2h-.8l-.6-1h-.4v1h-.8Z"/>
            <path className={joinClasses(styles["arknights"], "_1")} id={styles["arknights-r-inner"]} d="M39.3,59.4a.4.4,0,0,0-.4-.4h-.5v.8h.5a.4.4,0,0,0,.4-.4Z"/>
            <path className={joinClasses(styles["arknights"], "_2")} id={styles["arknights-k"]} data-inverse={""} d="M41.35,60.4v1.1h-.8V58.3h.8v1.2h0l.4-.5.8-.7h1l-1.4,1.3,1.4,1.9h-.9l-1-1.3Z"/>
            <path className={joinClasses(styles["arknights"], "_3")} id={styles["arknights-n"]} data-inverse={""} d="M43.8,58.3h.7l.7.9.7,1h.1a8.4,8.4,0,0,1-.1-1.2v-.7h.8v3.2h-.7l-.7-.9-.7-1h0v1.9h-.8Z"/>
            <path className={joinClasses(styles["arknights"], "_4")} id={styles["arknights-i"]} data-inverse={""} d="M47.1,58.3h.8v3.2h-.8Z"/>
            <path className={joinClasses(styles["arknights"], "_5")} id={styles["arknights-g"]} data-inverse={""} d="M48.22,59.9a1.6,1.6,0,0,1,1.7-1.7,1.5,1.5,0,0,1,1.4.9l-.8.2a.7.7,0,0,0-.6-.3.9.9,0,0,0,0,1.8c.5,0,.8-.2.8-.5h-.8v-.6h1.5v1.8h-.7v-.2h0c-.1.2-.5.3-.8.3a1.6,1.6,0,0,1-1.7-1.7"/>
            <path className={joinClasses(styles["arknights"], "_6")} id={styles["arknights-h"]} data-inverse={""} d="M53.8,59.5V58.3h.8v3.2h-.8V60.3H52.6v1.2h-.8V58.3h.8v1.2Z"/>
            <path className={joinClasses(styles["arknights"], "_7")} id={styles["arknights-t"]} data-inverse={""} d="M56.5,61.5h-.7V59h-1v-.7h2.7V59h-1Z"/>
            <path className={joinClasses(styles["arknights"], "_8")} id={styles["arknights-s"]} data-inverse={""} d="M58.42,60.1a1,1,0,0,1-.8-.9,1.1,1.1,0,0,1,1.2-1,1.2,1.2,0,0,1,1.2.9l-.7.2a.5.5,0,0,0-.6-.4c-.2,0-.3.1-.3.2s.3.3.7.5,1,.4,1,1-.5,1-1.3,1a1.4,1.4,0,0,1-1.4-1l.8-.2c.1.2.3.5.6.5s.4-.1.4-.3-.3-.3-.8-.5"/>

            <path className={joinClasses(styles["endfield"], "_0")} id={styles["endfield-e-1"]} data-inverse={""} d="M37,66.1H34.1V62.3H37v.8H35.1v.7h1.4v.8H35.1v.7H37Z"/>
            <path className={joinClasses(styles["endfield"], "_1")} id={styles["endfield-n"]} data-inverse={""} d="M41,66.1h-.9l-.8-1-.8-1.3h0c-.1,0,0,.6,0,1.5v.8h-1V62.3h.9l.8,1.1.9,1.1h0V62.3H41Z"/>
            <path className={joinClasses(styles["endfield"], "_2")} id={styles["endfield-d-1"]} data-inverse={""} d="M46.9,66.1H41.6V62.3h1.7a1.9,1.9,0,0,1,2,1.9,1.9,1.9,0,0,1-2,1.9"/>
            <path className={joinClasses(styles["endfield"], "_2")} id={styles["endfield-d-2-inner"]} d="M43.3,63.1h-.8v2.2h.8a1,1,0,0,0,1-1.1,1.1,1.1,0,0,0-1-1.1"/>
            <path className={joinClasses(styles["endfield"], "_3")} id={styles["endfield-f"]} data-inverse={""} d="M48.2,63.1H46.5v.8h1.4v.8H46.5v1.4h-.9V62.3h2.7Z"/>
            <path className={joinClasses(styles["endfield"], "_4")} id={styles["endfield-i"]} data-inverse={""} d="M49.65,66.1h-.9V62.3h.9Z"/>
            <path className={joinClasses(styles["endfield"], "_5")} id={styles["endfield-e-2"]} data-inverse={""} d="M53,66.1H50.2V62.3H53v.8H51.1v.7h1.5v.8H51.1v.7H53Z"/>
            <path className={joinClasses(styles["endfield"], "_6")} id={styles["endfield-l"]} data-inverse={""} d="M56.3,66.1H53.6V62.3h.9v3h1.8Z"/>
            <path className={joinClasses(styles["endfield"], "_7")} id={styles["endfield-d-2"]} data-inverse={""} d="M61.1,66.1H56.6V62.3h1.7a1.9,1.9,0,0,1,2,1.9,1.9,1.9,0,0,1-2,1.9"/>
            <path className={joinClasses(styles["endfield"], "_7")} id={styles["endfield-d-2-inner"]} d="M58.3,63.1h-.8v2.2h.8a1,1,0,0,0,1-1.1,1.1,1.1,0,0,0-1-1.1"/>
        </motion.svg>
    );
};
