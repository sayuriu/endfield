import Image from 'next/image';
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Language } from "@states/global";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import bodyStyles from './body-styles/Body.module.scss';
import { AnimFunctions } from "@utils/anims";
import Forceful = AnimFunctions.Forceful;

export const Body = () => {
    const [currentLanguage] = useAtom(Language);
    useEffect(() => {
        // console.log(currentLanguage);
    }, [currentLanguage]);
    return (<Box
        h="calc(100vh - 176px)"
        w="100vw"
        p={0}
        className={"rel"}
    >
        <AnimatePresence>
            <Index key={"indexPad"}/>
        </AnimatePresence>
    </Box>);
};

interface IIndex {
    index: number;
}

const Index: FC = () => {
    const [indexSubL, setIndexSubL] = useState(0);
    const [indexSubU, setIndexSubU] = useState(0);
    const [indexMain, setIndexMain] = useState(0);

    const indexMainController = useAnimation();
    const indexSubLController = useAnimation();
    const indexSubUController = useAnimation();

    const [isDecrementing, setIsDecrementing] = useState(false);
    useEffect(() => {

    }, []);

    const transition = {
        duration: 0.5,
        ease: Forceful,
    };
    const indexNumConfig = {
        className: "no-pointer",
        stroke: "#1D1D1D",
        fill: "#1D1D1D",
        fontFamily: "Jetbrains Mono",
        fontStyle: "italic",
        fontSize: 1000,
    };

    const setIndexTo = (index: number) => {
        setIndexMain(index);
    };
    const HandleScroll = (event: WheelEvent) => {
        const up = event.deltaY < 0;
        setIsDecrementing(up);
        if ((indexMain < 2 && up) || (indexMain > 8 && !up)) return;
        setIndexMain(indexMain + (up ? -1 : 1));
    };
    return (
        <motion.svg className={"fh"} layout viewBox="0 29 496 906" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Rectangle 1" filter="url(#filter0_bd_140_3)">
                <path d="M-1 29H495L233.935 935.347H-1V29Z" fill="white" fillOpacity="0.47" />
            </g>
                <g clipPath={"url(#index__inner-poly)"}>
                    <path id="Rectangle 3" onWheel={(e) => HandleScroll(e as unknown as WheelEvent)} filter="url(#filter1_d_140_3)" d="M0 29H419.424L162.007 935.694L0 935.694V29Z" fill="black" />
                    <motion.text
                        {...indexNumConfig}
                        animate={indexSubUController}
                    >
                        {indexSubU}
                    </motion.text>
                    <motion.text
                        {...indexNumConfig}
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.88, -0.07, 0.22, 1.01]
                        }}
                        exit={{ y: -100 }} x={-180} y={830}

                    >
                        {indexMain}
                    </motion.text>
                    <motion.text
                        {...indexNumConfig}
                        animate={indexSubLController}
                    >
                        {indexSubL}
                    </motion.text>
                </g>
            <defs>
                <clipPath id={"index__inner-poly"}>
                    <path d="M0 29H419.424L162.007 935.694L0 935.694V29Z"/>
                </clipPath>
                <filter id="filter0_bd_140_3" x="-30" y="0" width="554" height="964.347" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_140_3" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="14.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.48 0" />
                    <feBlend mode="normal" in2="effect1_backgroundBlur_140_3" result="effect2_dropShadow_140_3" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_140_3" result="shape" />
                </filter>
                <filter id="filter1_d_140_3" x="-4" y="25" width="427.424" height="914.694" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_140_3" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_140_3" result="shape" />
                </filter>
            </defs>
        </motion.svg>
    );
};

const OverviewScreen = () => {
    return (
        <motion.div>

        </motion.div>
    );
};
