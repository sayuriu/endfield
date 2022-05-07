import { HypergryphLogo } from "@components/logo/Hypergryph/Hypergryph";
import { MountainContourLogo } from "@components/logo/MountainContour/MountainContour";
import {HasAnimation, joinClasses} from "@utils/common";
import { FC } from "react";
import { motion } from "framer-motion";

export const IntroLogo: FC<HasAnimation> = ({dontAnimateChild= null}) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                duration: 0.5,
                ease: [0.88,-0.07, 0.22, 1.01]
            }}
            className={joinClasses("flex flex-row")}
            style={{width: 'min(850px, 90vw)'}}
        >
            <HypergryphLogo dontAnimateChild={dontAnimateChild} overrideStyles={{width: '55%'}}/>
            <MountainContourLogo dontAnimateChild={dontAnimateChild} overrideStyles={{width: '45%'}}/>
        </motion.div>
    );
};
