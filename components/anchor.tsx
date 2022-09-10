import { motion, MotionProps } from "framer-motion";
import { FC, ReactNode, useEffect, useState } from "react";
import { AnimFunctions } from "@utils/anims";

const { Forceful } = AnimFunctions;

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
            y: 20,
            opacity: 0,
        }}
        animate={{
            color: "hsl(231, 0%, 90%)",
            textDecoration: "underline dotted",
            textUnderlineOffset: isHovered ? "-1.1em" : "0.1em",
            textDecorationColor: "hsl(231, 0%, 65%)",
            y: 0,
            opacity: 1,
        }}
        exit={{
            y: -20,
            opacity: 0,
        }}
        transition={{
            textUnderlineOffset: {
                duration: 0.3,
                delay: isHovered ? 0 : 0.2,
                ease: Forceful,
            },
            duration: 0.3,
            ease: Forceful,
            y: {
                duration: 0.5,
                ease: Forceful,
            },
            opacity: {
                duration: 0.5,
                ease: Forceful,
            }
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
