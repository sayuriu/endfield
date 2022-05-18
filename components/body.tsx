import Image from 'next/image';
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Language } from "@states/global";
import { FC, ReactNode, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, MotionProps, useAnimation } from "framer-motion";

import bodyStyles from './body-styles/Body.module.scss';
import { AnimFunctions } from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import { emptyFunc, joinClasses, waitAsync } from "@utils/common";
import SlowDown = AnimFunctions.SlowDown;

export const Body = () => {
    const [currentLanguage] = useAtom(Language);
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (to: number) => {
        if (to === currentPage) return;
        setCurrentPage(to);
    };
    useEffect(() => {
        // console.log(currentLanguage);
    }, [currentLanguage]);
    return (<Box
        h="calc(100vh - 176px)"
        w="100vw"
        p={0}
        className={joinClasses(bodyStyles["content"], "rel grid")}
    >
        <AnimatePresence exitBeforeEnter>
            <Background key={"backgroundPad"}/>
        </AnimatePresence>
        <LeftPanel onIndexChange={setCurrentPage} onIndexAnimStart={(from, to) => changePage(to)}/>
        <RightPanel currentIndex={currentPage}/>
    </Box>);
};

interface IBackgroundProps {

}

const Background: FC<IBackgroundProps> = () => {
    return (<motion.div
        className={joinClasses(bodyStyles["preview-backgound"], "fh z0 overflow-hidden")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: Forceful }}
    >
        <Image
            src={"/img/05_HD.jpg"}
            alt={""}
            quality={100}
            priority
            layout={"fill"}
            objectFit={"cover"}
            style={{
                scale: 1
            }}
        />
    </motion.div>);
};

interface IIndex {
    onIndexAnimStart?: (from: number, to: number) => void;
    onIndexAnimEnd?: (from: number, to: number) => void;
    onIndexChange?: (index: number) => void;
}
const LeftPanel: FC<IIndex> = ({ onIndexAnimStart= emptyFunc, onIndexAnimEnd= emptyFunc, onIndexChange= emptyFunc }) => {
    const [init, setInit] = useState(true);
    const [indexSubU, setIndexSubU] = useState(0);
    const [indexMain, setIndexMain] = useState(1);
    const [indexSubL, setIndexSubL] = useState(2);
    const [indexPolygon, setIndexPolygon] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const indexMainController = useAnimation();
    const indexSubLController = useAnimation();
    const indexSubUController = useAnimation();

    const InnerPolygonVariants = {
        0: { d: "M0,0V928H0L0,0Z" },
        1: { d: "M0,28V928H175L425,0Z" },
        2: { d: "M0,28V928H425L175,0Z" },
        3: { d: "M0,28V928H280L280,0Z" }
    };

    const OuterPolygonVariants = {
        0: { d: "M0,0V928H0L0,0Z" },
        1: { d: "M0,28V928H240L490,0" },
        2: { d: "M0,28V928H490L240,0" },
        3: { d: "M0,28V928H310L310,0Z" }
    };

    const IndexTextVariants = {
        0: { transform: "translate(220px, 600px) rotate(-74deg)" },
        1: { transform: "translate(220px, 600px) rotate(-74deg)" },
        2: { transform: "translate(250px, 600px) rotate(-105deg)" },
        3: { transform: "translate(220px, 600px) rotate(-90deg)" },
    };

    const transition = {
        duration: init ? 1 : 2,
        ease: Forceful,
    };

    useEffect(() => {
        setIndexPolygon(indexMain);
        onIndexChange(indexMain);
        indexMainController.set({ y: 830, x: -200 , transition: { duration: 1.2, ease: SlowDown }});
        void indexMainController.start({ x: 0 });
        waitAsync(1000).then(
            () => {
                indexMainController.set({ transition });
                setInit(false);
            }
        );
        indexSubLController.set({ y: 1670 });
        indexSubUController.set({ y: -10 });
        return () => {
            indexMainController.stop();
            indexSubLController.stop();
            indexSubUController.stop();
        };
    }, []);

    const indexTextConfig = {
        fontFamily: "Jetbrains Mono",
        fontStyle: "bold",
        fontSize: 62,
        fill: "#fff",
        transition,
    };

    const indexNumConfig = {
        className: "no-pointer",
        stroke: "#1D1D1D",
        fill: "#1D1D1D",
        fontFamily: "Jetbrains Mono",
        fontStyle: "italic",
        fontSize: 1000,
        x: -180,
    };

    const HandleScroll = async (event: WheelEvent) => {
        if (isAnimating) return;
        const down = event.deltaY > 0;
        //                                                LOWER_INDEX_BOUND           UPPER_INDEX_BOUND
        await shiftNumberSequence(down, (indexMain < 2 && !down) || (indexMain > 2 && down));
    };
    const shiftNumberSequence = async (increment: boolean, wrap = false) => {
        setIsAnimating(true);
        const oldValue = indexMain;
        const newValue = wrap ? (increment ? 1 : 3) : (oldValue + (increment ? 1 : -1));
        onIndexAnimStart(oldValue, newValue);
        if (wrap) {
            increment ? setIndexSubL(newValue) : setIndexSubU(newValue);
        }
        setIndexPolygon(newValue);
        await Promise.all(
        increment ?
            [
                indexSubLController.start({ y: 830 }),
                indexMainController.start({ y: -10 }),
            ] :
            [
                indexSubUController.start({ y: 830 }),
                indexMainController.start({ y: 1670 })
            ]
        );
        await waitAsync(20);
        setIndexMain(newValue);
        onIndexChange(newValue);
        indexMainController.set({ y: 830 });
        increment ? indexSubLController.set({ y: 1670 }) : indexSubUController.set({ y: -10 });
        setIndexSubL(newValue + 1);
        setIndexSubU(newValue - 1);
        setIsAnimating(false);
        onIndexAnimEnd(oldValue, newValue);
        return Promise.resolve();
    };
    const commonPolygonProps = {
        animate: indexPolygon.toString(),
        transition,
        initial: "0",
    };
    return (
        <motion.svg
            className={joinClasses("fh z1", bodyStyles["index-panel"])}
            layout
            viewBox="0 29 520 880"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                filter="url(#filter0_bd_140_3)"
                fill="white"
                fillOpacity="0.47"
                variants={OuterPolygonVariants}
                {...commonPolygonProps}
            />
            <motion.path
                filter="url(#filter0_d_116_13)"
                onWheel={(e) => HandleScroll(e as unknown as WheelEvent)}
                fill="black"
                variants={InnerPolygonVariants}
                {...commonPolygonProps}
            />
            <g clipPath={"url(#index__inner-poly)"}>
                <motion.text
                    {...indexNumConfig}
                    initial={{ y: -10 }}
                    animate={indexSubUController}
                    transition={transition}
                >
                    {indexSubU}
                </motion.text>
                <motion.text
                    {...indexNumConfig}
                    animate={indexMainController}
                    transition={transition}
                >
                    {indexMain}
                </motion.text>
                <motion.text
                    {...indexNumConfig}
                    animate={indexSubLController}
                    transition={transition}
                >
                    {indexSubL}
                </motion.text>
                <motion.g
                    id={"label"}
                    variants={IndexTextVariants}
                    initial={"0"}
                    animate={indexPolygon.toString()}
                    transition={transition}
                >
                    <AnimatePresence>
                        {
                            indexPolygon === 1 &&
                            <motion.text
                                initial={{ x: -700 }}
                                animate={{ x: 0 }}
                                exit={{ x: 1300 }}
                                {...indexTextConfig}
                            >
                                OVERVIEW
                            </motion.text>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            indexPolygon === 2 &&
                            <g transform={"rotate(180)"}>
                                <motion.text
                                    initial={{ x: 400 }}
                                    animate={{ x: -500 }}
                                    exit={{ x: -1400 }}
                                    {...indexTextConfig}
                                >
                                    <tspan x={188}>PROTOCOL FIELD</tspan>
                                    <tspan x={0} dy={60}>RECOVERY DEPARTMENT</tspan>
                                </motion.text>
                            </g>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            indexPolygon === 3 &&
                            <motion.text
                                initial={{ x: -1050 }}
                                animate={{ x: -150 }}
                                exit={{ x: 900 }}
                                {...indexTextConfig}
                            >
                                COORDINATE RECORDS
                            </motion.text>
                        }
                    </AnimatePresence>
                </motion.g>
            </g>
            <text
                transform="rotate(90) translate(370 0)"
                {...Object.assign(indexTextConfig, { fontSize: 20 })}
            >
                {"<-SCROLL->"}
            </text>
            <defs>
                <clipPath id={"index__inner-poly"}>
                    <motion.path
                        variants={InnerPolygonVariants}
                        {...commonPolygonProps}
                    />
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
                <filter id="filter0_d_116_13" x="-1" y="0" width="427.424" height="914.694" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="3"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_116_13"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_116_13" result="shape"/>
                </filter>
            </defs>
        </motion.svg>
    );
};

const RightPanel: FC<{ currentIndex: number }> = ({ currentIndex }) => {
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
            d: "M4,0H800V907H250Z",
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
            d: "M54,0H800V907H300Z",
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
                            >
                                <tspan y={220} x={-120}>ENDFIELD</tspan>
                            </motion.text>
                            <motion.text
                                {...Object.assign(largeTextProps, largeText1LProps)}
                                transition={transition}
                            >
                                <tspan y={480} x={120}>EXPLORATION</tspan>
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

const OverviewScreen = () => {
    return (
        <motion.div>

        </motion.div>
    );
};
