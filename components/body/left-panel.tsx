import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { emptyFunc, joinClasses, waitAsync } from "@utils/common";
import { AnimFunctions } from "@utils/anims";
import bodyStyles from "@components/body/Body.module.scss";
import Forceful = AnimFunctions.Forceful;
import SlowDown = AnimFunctions.SlowDown;

interface IIndex {
    initIndex?: number;
    onIndexAnimStart?: (from: number, to: number) => void;
    onIndexAnimEnd?: (from: number, to: number) => void;
    onIndexChange?: (index: number) => void;
}
export const LeftPanel: FC<IIndex> = ({
   onIndexAnimStart= emptyFunc,
   onIndexAnimEnd= emptyFunc,
   onIndexChange= emptyFunc,
   initIndex = 1
}) => {
    const [init, setInit] = useState(true);
    const [indexSubU, setIndexSubU] = useState(initIndex - 1);
    const [indexMain, setIndexMain] = useState(initIndex);
    const [indexSubL, setIndexSubL] = useState(initIndex + 1);
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
        indexMainController.set({ y: 830, x: 200 , transition: { duration: 1.2, ease: SlowDown }});
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
        //                                    LOWER_INDEX_BOUND           UPPER_INDEX_BOUND
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
            className={joinClasses("fh z2", bodyStyles["index-panel"])}
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
                                    exit={{ x: -1800 }}
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
