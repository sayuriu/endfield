import { motion } from "framer-motion";
import {FC, ReactNode, useState} from "react";
import {AnimFunctions} from "@utils/anims";
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
            textUnderlineOffset: isHovered ? "-2em" : "0.1em",
            textDecorationColor: isHovered ? "hsla(0, 0%, 0%, 0)" : "hsl(231, 0%, 65%)",
        }}
        transition={{
            duration: 0.3,
            ease: Forceful,
        }}
        className={"rel cur-pointer"}
        href={to}
        target={blankTarget ? "_blank" : "_self"}
        rel={blankTarget ? "noopener noreferrer" : ""}
    >
        <motion.span
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
        >

        </motion.span>
        {children}
    </motion.a>;
};
