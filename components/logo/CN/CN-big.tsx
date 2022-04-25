import {HasAnimation, joinClasses, whichWider} from "@utils/common";
import {FC, useEffect, useRef, useState} from "react";
import styles from "@components/logo/EN/EN-big.module.scss";
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
            viewBox="-60 -55 242.8 181"
            xmlns="http://www.w3.org/2000/svg"
        >

        </motion.svg>
    );
};
