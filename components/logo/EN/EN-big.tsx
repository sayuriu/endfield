import styles from "@root/components/logo/EN/EN-big.module.scss";
import {HasAnimation, joinClasses, whichWider} from "@utils/common";
import { motion } from "framer-motion";
import {FC, useEffect, useRef, useState} from "react";
import {AnimFunctions} from "@utils/anims";
import Forceful = AnimFunctions.Forceful;

export const LogoLarge_EN: FC<HasAnimation> = ({ dontAnimateChild = null}) => {
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
            viewBox="-60 -55 242.8 181"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath id={styles["field-d-inner"]}>
                    <use xlinkHref={styles["field-d"]}/>
                </clipPath>
            </defs>
            <path id={styles["cn-square-1"]}
                  d="M 50 0 L 70 0 L 70 20 L 50 20 L 50 0 Z M 50.359 0.367 L 69.732 19.671"
                  transform="translate(35.9, 35.5) scale(1.215)"
                  fill="none"
                  stroke="#FFF"/>
            <path id={styles["cn-square-2"]} className="o0" d="M96,35h25.5v25.5h-25.5v-25.5l1,1h23.5,v23.5,h-23.5,v-23.5Z"/>
            <g id={styles["cn"]} className="o0">
                <path id={styles["cn-path"]} clipPath="url(#cn-inner)" d="M98.1,50.3h-.3v.2h.3ZM96,60.4h25.4V35H96Zm5.8-9.7v-.5h.4V50h.4a.3.3,0,0,0-.1.2h.5v.6h.2V51H103v.4a.4.4,0,0,1-.1.3h-.3a.3.3,0,0,0-.1-.2h.2V51h-.6a1.6,1.6,0,0,1-.4.7l-.2-.2a.5.5,0,0,0,.3-.5h-.2v-.2h.2Zm.6.7a.4.4,0,0,0-.3-.2l.2-.2.3.3Zm-2.4-.9v-.2h.7v-.2h.3a.3.3,0,0,0,.1.2h.6v.2h-.9v.2h.7c0,.5,0,.7-.1.8h-.5c0-.1-.1-.2-.1-.3h.4a1,1,0,0,1,.1-.4h-.6c0,.3-.2.5-.5.7a.2.2,0,0,0-.2-.2c.5-.2.5-.6.5-1Zm-1.5-.4h1.3v1.6H98.5Zm-.9,0h.8v1.3c0,.1-.1.2-.1.3h-.4c0-.1,0-.2-.1-.2h.3v-.3h-.3a.6.6,0,0,1-.3.6l-.2-.2a.8.8,0,0,0,.3-.8Zm-.8,0h.6v1.1H97v.2h-.2Zm-.1,4.5L98.2,52h1.5l-2,3.8h-1Zm3.3,4.6-3.3.7V58.7l3.3-.6Zm21,.7h-4l-1.2-.6v-.6h0V56.3l-.7.2V55.1h-.4v1.7l.7-.2v1.7l-2.6.9V60l-3.3-2.4v2.3H108V57.6l-3.2,2.3h-2L100.1,58l1-.8,2.7,1.9,4.2-2.9v-.3h-2.6V54.7H108v-.8h-3.3v.4l-1.4.9,1.6,1.1v1.4l-2.6-1.8-2.4,1.7v.2l-3.2.7V58l2.6-4.5h.5L101,52h1.4l-.5.7H108V52h1.5v.7h3.4v1.2h.4V52.4h1.4v1.5h.7v1h.4V52.9h1.4v1.4l.3-.2V52h1.4v1.6l1.7-.7v4.2l-1.4.6V54.9l-.3.2v2.7l-1.4.6V55.6h-.3v2.9H121ZM99.6,50.4h-.8v.3h.8Zm-1.5.3h-.3v.2h.3Zm1.5.3h-.8v.3h.8ZM101.2,57l1.1-.8,1.4,1v1.5Zm-4-6.7H97v.2h.2ZM100,55.3h-.4l-.7,1.4h.7v-.2l1.6-1.2-.7-.5Zm12.7-1.4h-3.2v.8h2.6v1.2h-2.6v.3l3,2v-.6l.8-.3V55.1h-.6ZM101.5,54.45m1,0.3.9-.8h-2.1ZM102.1,50.5h.55v.25h-.5Z"/>
            </g>
            <path id={styles["arknights-a"]} className={joinClasses(styles.arknights, '_1')} d="M1,2.3h.9l.2.7h.8L1.9.1H1L0,3H.8Zm.2-.8l.2,-.8h.1l.25,.9h-.58Z"/>
            <path id={styles["arknights-r"]} className={joinClasses(styles.arknights, '_2')} d="M12.3,1.9h.4L13.3,3h.8l-.7-1.2A.8.8,0,0,0,14,1c0-.7-.6-.9-1.3-.9H11.5V3h.8Zm0-1.3h.4c.3,0,.5.1.5.4a.5.5,0,0,1-.5.4h-.4Zv-.2h-.2v.3h.2l-.2-.2"/>
            <path id={styles["arknights-k"]} className={joinClasses(styles.arknights, '_3')} d="M23.6,2.2l.4-.4L24.8,3h.8L24.4,1.2l1-1.1h-.8l-.9,1.1h-.1V.1h-.7V3h.7Z"/>
            <path id={styles["arknights-n"]} className={joinClasses(styles.arknights, '_4')} d="M34.2,.1v2.9h.7v-1.9l1.1,1.9h.8v-2.9h-.8v1.9l-1.1-1.9Z"/>
            <path id={styles["arknights-i"]} className={joinClasses(styles.arknights, '_5')} d="M46.6.1h-.8V3h.8Z"/>
            <path id={styles["arknights-g"]} className={joinClasses(styles.arknights, '_6')} d="M57,3a2.4,2.4,0,0,0,1.1-.3V1.3H56.9v.6h.5v.4h-.3a.8.8,0,0,1-.9-.9A.8.8,0,0,1,57,.6l.6.2L58,.4A1.3,1.3,0,0,0,57,0a1.6,1.6,0,0,0-1.6,1.5A1.4,1.4,0,0,0,57,3"/>
            <path id={styles["arknights-h"]} className={joinClasses(styles.arknights, '_7')} d="M67,0v3h.8v-1.2h1v1.2h.8v-3h-.8v1h-1v-1Z"/>
            <path id={styles["arknights-t"]} className={joinClasses(styles.arknights, '_8')} d="M79.3,3H80V.6h.9V.1H78.4V.6h.9Z"/>
            <path id={styles["arknights-s"]} className={joinClasses(styles.arknights, '_9')} d="M89.7,2m.3,0l-.4,.6a1.7,1.7,0,0,0,1.2.4c.8,0,1.2-.4,1.2-.9s-.2-.6-.6-.8h-.4c-.3-.1-.5-.2-.5-.4s.1-.2.4-.2l.6.2.4-.4a1.3,1.3,0,0,0-1-.4c-.7,0-1.2.4-1.2.9a.8.8,0,0,0,.7.8h.4c.3.1.4.2.4.4s-.1.2-.4.2"/>
            <path id={styles["end-e"]} className={styles.end} d="M5.5,21.7H18.4V15.8H5.5V12.1H15.9l2.9-2.9V6.3H0V31.8H19V25.9H5.5Z"/>
            <path id={styles["end-n"]} className={styles.end} d="M44.5,26.4V6.3H39V22.4L27.7,6.3H21.5V31.9H27V15L39,31.9Z"/>
            <rect id={styles["end-n-blocker"]} x="21.6" y="6.3" width="23" height="25.7" fill="white"/>
            <path id={styles["end-d"]} className={styles.end} d="M71.4,22.8c.1-1.1.2-2.2.2-3.4v-1a14.6,14.6,0,0,0-.2-3,13.4,13.4,0,0,0-.7-2.7,7,7,0,0,0-1.5-2.5,9.3,9.3,0,0,0-2.3-2.1,12.6,12.6,0,0,0-3.3-1.4,21.5,21.5,0,0,0-4.5-.4H47.3V31.8H59.1a14.4,14.4,0,0,0,5.3-.8A10.2,10.2,0,0,0,68,29.1a9.3,9.3,0,0,0,2.2-3,11,11,0,0,0,1.2-3.3m-5.6-3.7c0,4.4-2.4,6.6-7.1,6.6H47.4l5.5-5.5V12.3h5.8c4.7,0,7.1,2.2,7.1,6.6Z"/>
            <path id={styles["field-f"]} className={styles.field} d="M0,60.5H5.5V50.4H18V44.6H5.5V40.8H18.3V35H0Z"/>
            <path id={styles["field-i"]} className={styles.field} d="M20.4,60.5h5.5V42.7H20.5l5.4-5.5V35H20.4Z"/>
            <path id={styles["field-l"]} className={styles.field} d="M55.7,35H50.2V60.5H68.1V54.2H55.7Z"/>
            <path id={styles["field-e-2"]} className={styles.field} d="M34.2,50.3h13V44.5h-13V40.7H44.6l2.9-2.8v-3H28.7V60.5h19V54.6H34.2Z"/>
            <path id={styles["field-e"]} className={styles.field} d="M34.2,50.3h13V44.5h-13V40.7H44.6l2.9-2.8v-3H28.7V60.5h19V54.6H34.2Z"/>
            <path id={styles["field-d"]} className={styles.field} clipPath={`url(${styles["field-d-inner"]})`} d="M93.2,41.4a11,11,0,0,0-1.5-2.6,11.4,11.4,0,0,0-2.3-2,10,10,0,0,0-3.3-1.4,21.4,21.4,0,0,0-4.5-.5H69.8V54.3l5.6-5.5V41h5.7c4.8,0,7.2,2.2,7.2,6.5v.2c0,4.5-2.4,6.7-7.2,6.7H69.8v6.2H81.6a17.4,17.4,0,0,0,5.3-.8,10.3,10.3,0,0,0,3.6-2,10.6,10.6,0,0,0,2.2-2.9,11.6,11.6,0,0,0,1.1-3.3,18.7,18.7,0,0,0,.3-3.4V47a26.4,26.4,0,0,0-.2-2.9,26.8,26.8,0,0,0-.7-2.7Z"/>
            <path id={styles["field-d-2"]} className={styles.field} onAnimationEnd={() => setIsExiting(true)}  d="M93.2,41.4a11,11,0,0,0-1.5-2.6,11.4,11.4,0,0,0-2.3-2,10,10,0,0,0-3.3-1.4,21.4,21.4,0,0,0-4.5-.5H69.8V54.3l5.6-5.5V41h5.7c4.8,0,7.2,2.2,7.2,6.5v.2c0,4.5-2.4,6.7-7.2,6.7H69.8v6.2H81.6a17.4,17.4,0,0,0,5.3-.8,10.3,10.3,0,0,0,3.6-2,10.6,10.6,0,0,0,2.2-2.9,11.6,11.6,0,0,0,1.1-3.3,18.7,18.7,0,0,0,.3-3.4V47a26.4,26.4,0,0,0-.2-2.9,26.8,26.8,0,0,0-.7-2.7Z"/>
    </motion.svg>);
};
