import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionProps, useAnimation, usePresence } from "framer-motion";
import { joinClasses, Nullable, useLocale, waitAsync } from "@utils/common";
import { useAtom } from "jotai";
import { ImageData, Language, LanguagePack } from "@states/global";
import bodyStyles from "@components/body/Body.module.scss";
import Image, { ImageProps } from "next/image";
import { AnimFunctions } from "@utils/anims";
import { Logger } from "@utils/logger";
import { MotionBox, MotionFlex } from "@components/motion";
import { Box, Flex } from "@chakra-ui/react";

const { SlowDown, Forceful } = AnimFunctions;

interface IImageGalleryProps {
    currentPage: number;
    unfocused?: boolean;
}
export const ImageGallery: FC<IImageGalleryProps> = ({ currentPage, unfocused = false }) => {
    const [imageData] = useAtom(ImageData);
    const [isZoomed, setIsZoomed] = useState(false);
    const imageArray = useMemo(() => [...imageData.entries()].filter(v => !v[0].match(/(department|world)/g)), []);

    const [currentImageIndex, setCurrentImageIndex] = useState(2);
    const [currentImageURL, setCurrentImageURL] = useState(imageData.get("assets/img/bg.jpg"));
    useEffect(() => {
        // if (!lockImage)
        switch (currentPage) {
            case 1:
                setCurrentImageURL(imageData.get("assets/img/world_bg.jpg"));
                break;
            case 2:
                setCurrentImageURL(imageData.get("assets/img/department_bg.jpg"));
                break;
            default:
                setCurrentImageURL(imageArray[currentImageIndex][1]);
        }
        // else if (currentImageURL !== imageArray[imageIndex][1]) setCurrentImageURL(imageArray[imageIndex][1]);
    });
    return <AnimatePresence>
        <MainBackground key={"mainBG"} url={currentImageURL} unfocused={(isZoomed && currentPage === 3) || unfocused}/>
        {currentPage === 3 && <>
            <ImageViewer
                imageArray={imageArray}
                imageIndex={currentImageIndex}
                onImageIndexChange={setCurrentImageIndex}
                inZoomMode={isZoomed}
                onImageFocusToggle={() => setIsZoomed(!isZoomed)}
            />
        </>}
    </AnimatePresence>;
};

interface IImageViewerProps {
    imageArray: [string, string][];
    imageIndex: number;
    onImageIndexChange?: (newIndex: number) => void;
    onImageFocusToggle?: (index: number) => void;
    inZoomMode?: boolean;
}
const ImageViewer: FC<IImageViewerProps> = ({
    imageArray,
    imageIndex,
    onImageIndexChange,
    onImageFocusToggle,
    inZoomMode = false
}) => {
    const [isPresent, safeToRemove] = usePresence();

    const [triggeredByMenu, setTriggeredByMenu] = useState(false);
    // false means it's from outbound (init)
    const locale = useLocale(useAtom(Language)[0], useAtom(LanguagePack)[0]);
    const updateTriggeredOutbound = useCallback((value: boolean) => {
        setTriggeredByMenu(() => value);
    }, []);

    const commonTransition = {
        duration: 0.7,
        ease: Forceful
    };

    const imageViewVariants = {
        "initial-outbound": {
            // clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            transition: {
                ...commonTransition,
                delay: 0
            }
        },
        "initial-native": {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            transition: {
                ...commonTransition,
                delay: 0
            }
        },
        "expand": {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            transition: {
                ...commonTransition,
                delay: triggeredByMenu ? 0 : 1.4
            }
        },
        "exit-outbound": {
            // clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            transition: {
                ...commonTransition,
                delay: 0
            }
        },
        "exit-native": {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            transition: {
                ...commonTransition,
                delay: 0
            }
        }
    };

    const imageViewAnimController = useAnimation();
    const handleExpandToggle = useCallback((zoom: boolean) => {
        if (triggeredByMenu) {
            imageViewAnimController.set(zoom ? "initial-native" : "expand");
            void imageViewAnimController.start(zoom ? "expand" : "exit-native");
        }
        else {
            imageViewAnimController.set(zoom ? "initial-outbound" : "expand");
            void imageViewAnimController.start(zoom ? "expand" : "exit-outbound");
        }
    }, [triggeredByMenu, isPresent]);

    useEffect(() => {
        return () => {
            updateTriggeredOutbound(false);
            safeToRemove?.();
        };
    }, [isPresent, inZoomMode]);

    return <>
        <ImagePicker
            key={"imagePicker"}
            imageArray={imageArray}
            initialImageIndex={imageIndex}
            onImageIndexChange={(newIndex) => {
                updateTriggeredOutbound(true);
                onImageIndexChange?.(newIndex);
            }}
            inZoomMode={inZoomMode}
            onImageFocusToggle={(i, willZoom) => {
                updateTriggeredOutbound(true);
                handleExpandToggle(willZoom);
                onImageFocusToggle?.(i);
            }}
        />
        <ImageDesc
            imageFocus={inZoomMode}
            key={"imageDesc"}
            uponExit={() => updateTriggeredOutbound(false)}
            text={(() => {
                const imgName = imageArray[imageIndex][0].split("/").pop()?.split(".")[0];
                const text = locale(`image-desc.${imgName}`);
                if (text.match(/^\{@/))
                    return `Extra image: ${imgName}`;
                return text;
            })()}
        >
            <MotionBox
                flexGrow={1}
                className={"fh fw rel"}
                layout
            >
                <AnimatePresence>
                    {isPresent && inZoomMode && <MotionBox
                        className={"fh fw"}
                        backdropFilter={"blur(10px)"}

                        variants={imageViewVariants}
                        initial={
                            // triggeredByMenu ?
                                "initial-native"
                                // : "initial-outbound"
                        }
                        animate={"expand"}
                        exit={
                            // isPresent && inZoomMode ?
                                "exit-native"
                            // : "exit-outbound"
                        }
                        layout
                    >
                        {/*<Image src={imageArray[imageIndex][1]} alt="" layout={"fill"} objectFit={"contain"}/>*/}

                        <AnimatePresence>
                            <MotionBox
                                key={`zoom-image-${imageIndex}`}
                                className={"fh fw"}
                                initial={{
                                    opacity: 0,
                                    // x: -20
                                    // clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                                }}
                                animate={{
                                    opacity: 1,
                                    // x: 0
                                    // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                                }}
                                exit={{
                                    opacity: 0,
                                    // x: 20
                                    // clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                                }}
                                transition={{ duration: 0.5, ease: SlowDown }}
                            >
                                <Image src={imageArray[imageIndex][1]} alt="" layout={"fill"} objectFit={"contain"}/>
                            </MotionBox>
                        </AnimatePresence>
                    </MotionBox>}
                </AnimatePresence>
            </MotionBox>
        </ImageDesc>
    </>;
};

interface IImageDescProps {
    text: string;
    imageFocus?: boolean;
    children?: ReactNode;
    uponExit?: () => void;
}
export const ImageDesc: FC<IImageDescProps> = ({ text: upcomingText, uponExit, imageFocus = false, children }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [currentText, setCurrentText] = useState(upcomingText);
    const [bgText, setBgText] = useState(upcomingText);
    useEffect(() => {
        setCurrentText(() => upcomingText);
        if (upcomingText.length < bgText.length && !imageFocus)
            waitAsync(390).then(() => setBgText(() => upcomingText));
        else
            setBgText(() => upcomingText);
        return () => {
            setIsExiting(true);
            uponExit?.();
        };
    }, [upcomingText]);
    return <Flex
        fontFamily={"Oswald"}
        fontSize={"18px"}
        className={"abs fw fh b0 z3 flex-col"}
        left={"calc((100vh - 176px) / (438 / 154.29))"}
        maxW={"calc(100vw - (100vh - 176px) / (438 / 154.29) - clamp(100px, 20vw, 270px) - 10px)"}
        alignItems={imageFocus ? "stretch" : "flex-start"}
    >
        {children}
        <MotionFlex
            bg={"#FDFD1F"}
            className={"z3 flex-col overflow-hidden"}
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{
                duration: 0.7,
                ease: SlowDown,
                y: {
                    duration: isExiting ? 1.2 : 0.7,
                    delay: isExiting ? 0.1 : 1,
                    ease: isExiting ? Forceful : SlowDown,
                },
            }}
            maxW={"calc(100vw - (100vh - 176px) / (438 / 154.29) - clamp(100px, 20vw, 270px) - 10px)"}
            layout
        >
            <MotionBox
                p={"10px 20px"}
                className={"rel"}
                initial={{
                    flexGrow: 1,
                    y: 80
                }}
                animate={{
                    y: 0
                }}
                exit={{
                    y: 80
                }}
                transition={{
                    duration: 0.5,
                    // delay: prevText?.length ?? 0 > text.length ? 0.2 : 0,
                    ease: Forceful,
                    y: {
                        duration: isExiting ? 1.2 : 0.7,
                        delay: isExiting ? 0 : 0.7,
                        ease: isExiting ? Forceful : SlowDown,
                    },
                }}
                bg={"#000"}
                layout
            >
                <AnimatePresence>
                    <MotionBox
                        key={`text-desc-${currentText[0]}-${currentText.length}`}
                        className={"abs overflow-hidden"}
                        as={"p"}
                        color={"#fff"}
                        layout={"position"}
                        initial={{
                            opacity: 0,
                            y: 20,
                            paddingRight: 5
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.2,
                                duration: 0.5,
                                ease: SlowDown,
                                y: {
                                    duration: 0.7,
                                    delay: 0.2,
                                    ease: SlowDown,
                                }
                            }
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                            transition: {
                                duration: 0.5,
                                delay: 0,
                                ease: SlowDown,
                            }
                        }}
                    >
                        {currentText}
                    </MotionBox>
                </AnimatePresence>
                <MotionBox
                    as={"p"}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ y: 0 }}
                    transition={{
                        delay: currentText?.length ?? 0 < bgText.length ? 0.2 : 0.5,
                        ease: Forceful,
                        duration: 1,
                        y: {
                            duration: 0.7,
                            delay: 0.2,
                            ease: SlowDown,
                        },
                    }}
                >
                    {bgText}
                </MotionBox>
            </MotionBox>
        </MotionFlex>
    </Flex>;
};

interface IMainBackgroundProps {
    url?: string;
    unfocused?: boolean;
}
const MainBackground: FC<IMainBackgroundProps> = ({ url, unfocused = false }) => {
    return (
        <AnimatePresence>
            <MotionBox
                key={url}
                className={joinClasses(bodyStyles["preview-background"], "abs t0 fh z0 overflow-hidden")}
                left={"calc((100vh - 176px) * 120 / 592)"}
                w={"calc(100vw - (100vh - 176px) * 120 / 592)"}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    filter: unfocused ? "blur(5px)" : "blur(0px)",
                }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.5,
                    delay: 0.45,
                    ease: Forceful,
                    filter: {
                        delay: unfocused ? 0.5 : 0,
                        duration: 0.5,
                        ease: Forceful,
                    }
                }}
            >
                <Image
                    src={url!}
                    alt={""}
                    quality={"auto"}
                    layout={"fill"}
                    objectFit={"cover"}
                    style={{
                        scale: 1
                    }}
                />
            </MotionBox>
        </AnimatePresence>
    );
};

interface IImagePickerProps {
    imageArray: [string, string][];
    initialImageIndex: number;
    onImageIndexChange?: (newIndex: number) => void;
    onImageFocusToggle?: (index: number, willZoom: boolean) => void;
    inZoomMode?: boolean;
}
export const ImagePicker: FC<IImagePickerProps> = ({
    imageArray,
    initialImageIndex,
    onImageIndexChange,
    onImageFocusToggle,
    inZoomMode = false
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<Nullable<number>>(initialImageIndex);
    const [currentHoveredIndex, setCurrentHoveredIndex] = useState<Nullable<number>>(null);
    const [prevHoveredIndex, setPrevHoveredIndex] = useState<Nullable<number>>(null);

    const updateHoverIndex = useCallback((index: Nullable<number>) => {
        setCurrentHoveredIndex(prev => {
            if (prev === index) return prev;
            setPrevHoveredIndex(prev);
            return index;
        });
    }, []);

    useEffect(() => {
        return setIsExiting(true);
    }, []);
    return <MotionFlex
        className={"fh abs t0 r0 z2 flex-col"}
        isolation={"isolate"}
        w={"clamp(100px, 20vw, 270px)"}
        initial={{ x: "calc(100% + 10px)" }}
        exit={{ x: "calc(100% + 10px)" }}
        animate={{ x: 0 }}
        transition={{
            duration: 1,
            delay: isExiting ? 0.2 : 1,
            when: "beforeChildren",
            ease: isExiting ? Forceful : SlowDown
        }}
        onHoverEnd={() => {
            setIsHovering(false);
            updateHoverIndex(null);
        }}
        onHoverStart={() => setIsHovering(true)}
    >
        <MotionBox
            className={"fh abs t0 rfull z0"}
            w={"10px"}
            animate={inZoomMode || isHovering ? {
                    opacity: 0.3,
                    backgroundColor: "#000"
                } : {
                    opacity: 0.4,
                    backgroundColor: "#fff"
                }
            }
            transition={{
                duration: 0.3,
                ease: Forceful
            }}
        />
        {imageArray.map((imageURL, i) =>
            <Image2
                trackIndex={currentImageIndex}
                hoverIndex={currentHoveredIndex}
                previousHoverIndex={prevHoveredIndex}
                isCurrent={currentImageIndex === i}
                key={`gallery-img-${i}`}
                inFocus={inZoomMode}
                onClick={() => {
                    setCurrentImageIndex(() => {
                        onImageIndexChange?.(i);
                        return i;
                    });
                    if (currentImageIndex === i)
                        onImageFocusToggle?.(i, !inZoomMode);
                }}
                onHoverCapture={() => updateHoverIndex(i)}
                isHoveredOutbound={currentHoveredIndex === i}
                src={imageArray[i][1]}
            />
        )}
    </MotionFlex>;
};

interface IImage2Props {
    isCurrent?: boolean;
    isHoveredOutbound?: boolean;
    inFocus?: boolean;
    trackIndex: Nullable<number>;
    hoverIndex: Nullable<number>;
    previousHoverIndex: Nullable<number>;
    onHoverCapture?: (index: Nullable<number>) => void;
    preInit?: boolean;
}
export const Image2: FC<ImageProps & IImage2Props> = ({
    preInit = false,
    trackIndex,
    hoverIndex,
    inFocus = false,
    // this is clonky but bear with me
    previousHoverIndex,
    isCurrent = false,
    isHoveredOutbound = false,
    onHoverCapture,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const transition = {
        duration: 0.5,
        ease: SlowDown
    };
    return <MotionBox
        className={joinClasses("fw rel")}
        cursor={isCurrent ? (inFocus ? "zoom-out" : "zoom-in") : "pointer"}
        animate={{
            height: 1,
            flexGrow: isCurrent ? 1.8 : (isHovered ? 1.5 : 1),
        }}
        transition={transition}
        onClick={props.onClick}
        onHoverStart={() => {
            setIsHovered(true);
            onHoverCapture?.(trackIndex);
        }}
        onHoverEnd={() => setIsHovered(false)}
    >
        <Image
            alt=""
            className={"fw fh"}
            style={{
                transition: `all 0.5s cubic-bezier(${SlowDown.toString()})`,
                filter: isCurrent ? "brightness(1.2) sepia(0)" : (isHovered ? "brightness(.9) sepia(.3)" : "brightness(.7) sepia(.9)"),
            }}
            layout={"fill"}
            objectFit="cover"
            {...{ ...props } as ImageProps & { src: string }}
        />
        {isCurrent && <MotionBox
            className={"fh abs t0 rfull z1"}
            initial={{
                width: 10,
                backgroundColor: "#FDFD1F",
                opacity: trackIndex === null ? 0 : undefined,
            }}
            animate={{
                opacity: trackIndex === null ? 1 : undefined,
            }}
            layoutId={"thumbnailImage"}
            transition={transition}
        />}
        <MotionBox
            className={"fh abs t0 r0 flex j-flex-center a-flex-center no-pointer"}
            initial={{
                width: "25%",
                x: "100%",
            }}
            animate={{
                x: isHovered && isCurrent && !inFocus ? "0%" : "100%",
                background: isHovered ?
                    "linear-gradient(90deg, rgba(253, 253, 31, 0) 0%, rgba(253, 253, 31, 1) 0%)" :
                    "linear-gradient(90deg, rgba(253, 253, 31, 0) 0%, rgba(253, 253, 31, 1) 100%)",
            }}
            transition={{
                ...transition,
                duration: isHovered ? 0.8 : 0.5,
                background: {
                    ...transition,
                    duration: 0.8,
                    delay: isHovered ? 0.2 : 0,
                }
            }}
        >
            <MagnifierIcon
                height={100}
                width={100}
                animate={{
                    x: 10
                }}
                transition={{
                    ...transition,
                    duration: isHovered ? 0.8 : 0.5
                }}
            />
        </MotionBox>
        <AnimatePresence>
            {isCurrent && inFocus && <MotionBox
                key={`ImageCollapse-${props.src.toString()}`}
                className={"fh abs t0 l0 flex j-flex-center a-flex-center no-pointer overflow-hidden"}
                initial={{
                    width: "20%",
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                }}
                animate={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    background: isHovered ?
                        "linear-gradient(-90deg, rgba(253, 253, 31, 0) 0%, rgba(253, 253, 31, 1) 0%)" :
                        "linear-gradient(-90deg, rgba(253, 253, 31, 0) 0%, rgba(253, 253, 31, 1) 100%)",
                }}
                exit={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                }}
                transition={{
                    ...transition,
                    duration: 0.5,
                    background: {
                        ...transition,
                        duration: 0.8,
                        delay: isHovered ? 0.2 : 0,
                    }
                }}
            >
                <motion.svg
                    transition={{
                        ...transition,
                        duration: isHovered ? 0.8 : 0.5
                    }}
                    initial={{
                        x: -30
                    }}
                    animate={{
                        x: isHovered ? -10 : -20,
                        opacity: isHovered ? 1 : .6,
                    }}
                    viewBox="56.139 45.667 179.605 179.605"
                    width="179.605"
                    height="179.605"
                >
                    <path d="M 145.941 225.272 L 145.941 45.667 L 235.744 135.469 L 145.941 225.272 Z"/>
                </motion.svg>
            </MotionBox>}
            {isHoveredOutbound && !isCurrent && <MotionBox
                className={"fh abs t0 rfull z0"}
                initial={{
                    width:  10,
                    backgroundColor: "#fff",
                    // mixBlendMode: "exclusion",
                    opacity: hoverIndex === null ? 0 : undefined,
                    // x: previousHoverIndex === null ? -50 : undefined,
                }}
                animate={{
                    opacity: hoverIndex === null ? 1 : undefined,
                    // x: hoverIndex === null ? 0 : undefined,
                }}
                exit={{
                    opacity: 0,
                    // x: -50,
                }}
                layoutId={"hoverImage"}
                transition={transition}
            />}
        </AnimatePresence>
    </MotionBox>;
};

const MagnifierIcon: FC<{ height: number, width: number } & MotionProps> = ({ ...props }) => {
    return <motion.svg viewBox="27.773 30.899 200.45 200.054" {...props}>
        <ellipse
            stroke={"#000"}
            fill={"none"}
            strokeWidth={21}
            cx="140.823" cy="113.291"
            rx="61.4" ry="61.392"/>
        <path stroke={"#000"} d="M 90.429 147.98 L 104.746 162.298 L 42.091 224.953 L 27.773 210.635 L 90.429 147.98 Z"></path>
    </motion.svg>;
};
