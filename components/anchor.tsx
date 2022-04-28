import { motion } from "framer-motion";
import { FC, ReactNode, useEffect, useState } from "react";
import { AnimFunctions } from "@utils/anims";
import Forceful = AnimFunctions.Forceful;

interface AnchorProps {
    to: string;
    blankTarget?: boolean;
    children?: ReactNode;
}

export const Anchor: FC<AnchorProps> = ({
    children,
    to,
    blankTarget = true,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);
    return <motion.a
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{
            textDecoration: "underline dotted",
            textUnderlineOffset: "1em",
        }}
        animate={{
            color: "hsl(231, 0%, 90%)",
            textDecoration: "underline dotted",
            textUnderlineOffset: isHovered ? "-1.1em" : "0.1em",
            textDecorationColor: "hsl(231, 0%, 65%)",
        }}
        transition={{
            textUnderlineOffset: {
                duration: 0.3,
                delay: isHovered ? 0 : 0.2,
                ease: Forceful,
            },
            duration: 0.3,
            ease: Forceful,
        }}
        className={"rel cur-pointer"}
        href={to}
        target={blankTarget ? "_blank" : "_self"}
        rel={blankTarget ? "noopener noreferrer" : ""}
    >
        {!isSSR && <motion.span
            className={"abs fw fh"}
            initial={{
                backgroundImage: "linear-gradient(transparent 100%, hsl(213, 0%, 70%) 0%)",
            }}
            animate={{
                backgroundImage: isHovered ? "linear-gradient(transparent 0%, #fff 0%)" : "linear-gradient(transparent 100%, #fff 0%)",
                mixBlendMode: "difference",
            }}
            transition={{
                duration: 0.5,
                ease: Forceful,
            }}
        />}
        {children}
    </motion.a>;
};
