import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { AnimFunctions } from "@utils/anims";
const { Forceful } = AnimFunctions;
import { OverridableStyle } from "@utils/common";

interface ICheckbox {
    disabled?: boolean;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    fg?: string;
    bg?: string;
    animDur?: number;
    h?: number | string;
    w?: number | string;
}

export const Checkbox: FC<ICheckbox & OverridableStyle> = (
    {
        checked,
        fg = "#000",
        bg = "transparent",
        h,
        w,
        animDur = 0.5,
        onChange,
        overrideStyles
    }
) => {
    const [isChecked, setIsChecked] = useState(checked);
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    const transition = {
        duration: animDur,
        ease: Forceful,
    };
    const handleClick = () => {
        setIsChecked(!isChecked);
        if (onChange) onChange(!isChecked);
    };
    const markVariants = {
        checked: { transform: "scaleX(1)" },
        unchecked: { transform: "scaleX(0)" },
    };
    return (
        <button onClick={handleClick} style={overrideStyles}>
            <motion.svg
                viewBox="0 0 312 300"
                xmlns="http://www.w3.org/2000/svg"
                fill={bg}
                animate={{
                    height: h,
                    width: w,
                }}
                transition={transition}
            >
                <rect x="8.5" y="8.49988" width="283" height="283" stroke="black" strokeWidth="17"/>
                <motion.rect
                    fill={bg}
                    transition={transition}
                    initial={{
                        width: 150,
                        height: 150,
                        x: 150,
                        y: 0
                    }}
                    animate={{
                        x: isChecked ? 152 : 300,
                        y: isChecked ? 0 : -150,
                    }}
                />
                <motion.line
                    x1="143.261"
                    y1="200.609"
                    x2="53.129"
                    y2="124.538"
                    stroke={fg}
                    strokeWidth="23"
                    initial={isChecked ? "checked" : "unchecked"}
                    animate={isChecked ? "checked" : "unchecked"}
                    variants={markVariants}
                    transition={transition}
                />
                <motion.line
                    x1="135.603"
                    y1="208.884"
                    x2="302.595"
                    y2="13.8711"
                    stroke={fg}
                    strokeWidth="23"
                    initial={isChecked ? "checked" : "unchecked"}
                    animate={isChecked ? "checked" : "unchecked"}
                    variants={markVariants}
                    transition={transition}
                />
            </motion.svg>
        </button>
    );
};
