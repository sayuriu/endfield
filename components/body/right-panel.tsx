import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bodyStyles from "@components/body/Body.module.scss";
import { joinClasses, waitAsync } from "@utils/common";
import { AnimFunctions } from "@utils/anims";
const { Forceful } = AnimFunctions;

export const RightPanel: FC<{ currentIndex: number }> = ({ currentIndex }) => {
    const [init, setInit] = useState(true);
    const [indexPolygon, setIndexPolygon] = useState(0);
    useEffect(() => {
        setIndexPolygon(currentIndex);
        waitAsync(1000).then(() => setInit(false));
    }, []);
    const transition = {
        duration: init ? 1.5 : 2,
        ease: Forceful,
    };
    const OuterPolygonVariants = {
        0: {
            d: "M800,0H800V907H800Z",
            fillOpacity: 0,
        },
        1: {
            d: "M250,0H800V907H4Z",
            fillOpacity: 0.47,
        },
        2: {
            d: "M40,0H800V907H380Z",
            fillOpacity: 0.47,
        },
        3: {
            d: "M430,0H800V907H430Z",
            fillOpacity: 0.05,
        },
    };
    const InnerPolygonVariants = {
        0: {
            d: "M800,0H800V907H800Z",
            fillOpacity: 0,
        },
        1: {
            d: "M300,0H800V907H54Z",
            fillOpacity: 0.5,
        },
        2: {
            d: "M90,0H800V907H430Z",
            fillOpacity: 0.5,
        },
        3: {
            d: "M480,0H800V907H480Z",
            fillOpacity: 0.1,
        },
    };

    const commonPolygonProps = {
        animate: (init ? indexPolygon : currentIndex).toString(),
        initial: "0",
        fill: "#fff",
        transition,
    };

    const largeTextProps = {
        fontFamily: "Oswald",
        fontSize: 300,
        fill: "#000",
        opacity: .3,
        fontWeight: "500",
    };

    const largeText1UProps = {
        initial: { opacity: 0, x: 450 },
        animate: { opacity: .3, x: 0 },
        exit: { opacity: 0, x: -450 },
    };

    const largeText1LProps = {
        initial: { opacity: 0, x: 600 },
        animate: { opacity: .3, x: 0 },
        exit: { opacity: 0, x: -600 },
    };

    const largeText2Props = {
        fontSize: 250,
        fontWeight: "bold",
    };


    return (
        <motion.svg
            viewBox="0 0 800 907"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={joinClasses("fh z1", bodyStyles["right-panel"])}
        >
            <motion.path
                filter="url(#filter0_bd_186_4)"
                variants={OuterPolygonVariants}
                {...commonPolygonProps}
            />
            <motion.path
                filter="url(#filter1_bd_186_4)"
                variants={InnerPolygonVariants}
                {...commonPolygonProps}
            />
            <g clipPath={"url(#right-inner-polygon"}>
                <AnimatePresence>
                    {
                        currentIndex === 1 && <>
                            <motion.text
                                {...Object.assign(largeTextProps, largeText1UProps)}
                                transition={transition}
                                key={"index-1-text-1"}
                            >
                                <tspan y={220} x={-120}>ENDFIELD</tspan>
                            </motion.text>
                            <motion.text
                                {...Object.assign(largeTextProps, largeText1LProps)}
                                transition={transition}
                                key={"index-1-text-2"}
                            >
                                <tspan y={480} x={120}>EXPLORATION</tspan>
                            </motion.text>
                        </>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        currentIndex === 2 && <>
                            <motion.text
                                {...Object.assign(largeTextProps, largeText2Props, largeText1UProps)}
                                transition={transition}
                                key={"index-2-text-1"}
                            >
                                <tspan y={220} x={-120}>PROTOCOL</tspan>
                            </motion.text>
                            <motion.text
                                {...Object.assign(largeTextProps, largeText2Props, largeText1LProps)}
                                transition={transition}
                                key={"index-2-text-2"}
                            >
                                <tspan y={450} x={190}>FIELD</tspan>
                            </motion.text>
                            <motion.text
                                {...Object.assign(largeTextProps, largeText2Props, largeText1UProps)}
                                transition={transition}
                                key={"index-2-text-3"}
                            >
                                <tspan y={680} x={120}>RECOVERY</tspan>
                            </motion.text>
                            <motion.text
                                {...Object.assign(largeTextProps, largeText2Props, largeText1LProps)}
                                transition={transition}
                                key={"index-2-text-4"}
                            >
                                <tspan y={910} x={120}>DEPARTMENT</tspan>
                            </motion.text>
                        </>
                    }
                </AnimatePresence>
            </g>
            <defs>
                <clipPath id={"right-inner-polygon"}>
                    <motion.path
                        variants={InnerPolygonVariants}
                        {...Object.assign(commonPolygonProps, { fill: undefined, fillOpacity: 1 })}
                    />
                </clipPath>
                <filter id="filter0_bd_186_4" x="0.290833" y="-3.13477" width="800" height="919" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImage" stdDeviation="2"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_186_4"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="-4"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="effect1_backgroundBlur_186_4" result="effect2_dropShadow_186_4"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_186_4" result="shape"/>
                </filter>
                <filter id="filter1_bd_186_4" x="28.0472" y="-20.1091" width="800" height="949" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImage" stdDeviation="10.5"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_186_4"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="-2"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="effect1_backgroundBlur_186_4" result="effect2_dropShadow_186_4"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_186_4" result="shape"/>
                </filter>
            </defs>
        </motion.svg>
    );
};
