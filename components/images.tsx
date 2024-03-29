import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionProps, useAnimation, usePresence } from "framer-motion";
import { joinClasses, Nullable, useLocale, waitAsync } from "@utils/common";
import { atom, useAtom } from "jotai";
import { ImageData, Language, LanguagePack } from "@states/global";
import bodyStyles from "@components/body/Body.module.scss";
import Image, { ImageProps } from "next/image";
import { SlowDown, Forceful } from "@utils/anims";
import { Logger } from "@utils/logger";
import { MotionBox, MotionFlex } from "@components/motion";
import { Box, Flex } from "@chakra-ui/react";

const ImageIndex = atom(2);
const InZoomMode = atom(false);
export const ImageGalleryInit = atom(true);
export const InImageFullScreenMode = atom(false);

const MouseMoveInZoomMode = atom(false);
const MouseMoveInZoomModeTimeout = atom<Nullable<number>>(null);

interface IImageGalleryProps {
    currentPage: number;
    unfocused?: boolean;
}
export const ImageGallery: FC<IImageGalleryProps> = ({ currentPage, unfocused = false }) => {
    const [imageData] = useAtom(ImageData);
    const [inZoomMode] = useAtom(InZoomMode);
    const imageArray = useMemo(() => [...imageData.entries()].filter(v => !v[0].match(/(department|world)/g)), []);

    const [currentImageIndex] = useAtom(ImageIndex);
    const [currentImageURL, setCurrentImageURL] = useState(imageData.get("assets/img/bg.jpg"));
    useEffect(() => {
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
    }, [currentPage, currentImageIndex]);
    return <AnimatePresence>
        <MainBackground
            key={"mainBG"}
            url={currentImageURL}
            unfocused={(inZoomMode && currentPage === 3) || unfocused}
            overrideDelay={currentPage === 3 ? 0 : undefined}
        />
        {currentPage === 3 && <>
            <ImageViewer
                imageArray={imageArray}
            />
        </>}
    </AnimatePresence>;
};

interface IImageViewerProps {
    imageArray: [string, string][];
    // imageIndex: number;
    onImageIndexChange?: (newIndex: number) => void;
    onImageFocusToggle?: (index: number) => void;
    // inZoomMode?: boolean;
}
const ImageViewer: FC<IImageViewerProps> = ({
    imageArray,
    onImageIndexChange,
    onImageFocusToggle,
}) => {
    const [isPresent, safeToRemove] = usePresence();

    const [inImageFullScreenMode, setInImageFullScreenMode] = useAtom(InImageFullScreenMode);
    const [,setMouseMove] = useAtom(MouseMoveInZoomMode);
    const [imageGalleryInit] = useAtom(ImageGalleryInit);
    const [,setComponentFirstInit] = useAtom(ImageGalleryInit);
    const [inZoomMode] = useAtom(InZoomMode);
    const [currentImageIndex] = useAtom(ImageIndex);
    const locale = useLocale(useAtom(Language)[0], useAtom(LanguagePack)[0]);

    const [triggeredByMenu, setTriggeredByMenu] = useState(false);

    const updateTriggeredOutbound = useCallback((value: boolean) => {
        if (triggeredByMenu !== !value)
            setTriggeredByMenu(() => !value);
    }, []);

    const commonTransition = {
        duration: 0.7,
        ease: SlowDown
    };

    const imageViewVariants = {
        "initial-outbound": {
            // clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            y: 100
        },
        "initial-native": {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        "expand": {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            y: 0
        },
        "exit-outbound": {
            // clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            y: 100,
            transition: {
                duration: 1,
                ease: Forceful
            }
        },
        "exit-native": {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        }
    };

    const imageViewAnimController = useAnimation();
    const handleExpandToggle = useCallback((zoom: boolean) => {
        if (zoom)
            imageViewAnimController.set("initial-native");
        void imageViewAnimController
            .start(zoom ? "expand" : "exit-native");
    }, []);

    const listener = useCallback((e: KeyboardEvent) => {
        Logger.instance.debug({}, "ImageViewer", "Keydown", e.key);
        if (e.key === "Escape") {
            setInImageFullScreenMode(false);
            // handleExpandToggle(false);
        }
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isPresent)
        {
            timeout = setTimeout(() => {
                setComponentFirstInit(false);
            }, 500);
            window.addEventListener("keydown", listener);
        }
        if (inZoomMode)
            void imageViewAnimController
                .start(
                    isPresent ? "expand" : "exit-outbound",
                    isPresent ? { ...commonTransition, delay: 1.2 } : undefined
                );
        else if (imageGalleryInit)
            void imageViewAnimController.set(isPresent ? "initial-outbound" : "initial-native");
        return () => {
            if (isPresent && timeout)
                clearTimeout(timeout);
            else if (!isPresent)
            {
                window.removeEventListener("keydown", listener);
                setComponentFirstInit(true);
            }
            safeToRemove?.();
        };
    }, [isPresent]);

    return <>
        <ImagePicker
            key={"imagePicker"}
            imageArray={imageArray}
            initialImageIndex={currentImageIndex}
            onImageIndexChange={(newIndex) => {
                updateTriggeredOutbound(false);
                if (newIndex !== currentImageIndex)
                    onImageIndexChange?.(newIndex);
            }}
            onImageFocusToggle={(i, willZoom) => {
                handleExpandToggle(willZoom);
                onImageFocusToggle?.(i);
            }}
        />
        <ImageDesc
            hideText={inImageFullScreenMode}
            key={"imageDesc"}
            uponExit={() => updateTriggeredOutbound(true)}
            text={(() => {
                const imgName = imageArray[currentImageIndex][0].split("/").pop()?.split(".")[0];
                const text = locale(`image-desc.${imgName}`);
                if (text.match(/^\{@/))
                    return `Extra image: ${imgName}`;
                return text;
            })()}
        >
            <MotionBox
                flexGrow={1}
                className={"rel fw flex a-flex-center j-flex-center"}
                h={100}
                backdropFilter={"blur(10px)"}
                variants={imageViewVariants}
                initial={"initial-outbound"}
                animate={imageViewAnimController}
                transition={commonTransition}
                layout={"size"}
            >
                <MotionBox
                    layout
                    className={"rel fw"}
                    style={{
                        aspectRatio: "1920 / 1080"
                    }}
                    transition={commonTransition}
                >
                    <AnimatePresence>
                        <MotionFlex
                            onMouseMove={() => setMouseMove(true)}
                            key={`image-zoom-${currentImageIndex}`}
                            className={"abs fw"}
                            m={"auto"}
                            layout={"position"}
                            justifyContent={"flex-end"}
                            alignItems={"flex-end"}
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
                            bg={
                                // `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`
                                `url(${imageArray[currentImageIndex][1]})`
                            }
                            style={{
                                aspectRatio: "1920 / 1080",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                            <ImageToolbar/>
                        </MotionFlex>
                    </AnimatePresence>
                </MotionBox>
            </MotionBox>
        </ImageDesc>
    </>;
};

interface IImageDescProps {
    text: string;
    children?: ReactNode;
    uponExit?: () => void;
    hideText?: boolean;
}
export const ImageDesc: FC<IImageDescProps> = ({ text: upcomingText, hideText = false, uponExit, children }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [currentText, setCurrentText] = useState(upcomingText);
    const [bgText, setBgText] = useState(upcomingText);

    const [inZoomMode] = useAtom(InZoomMode);
    const [inImageFullScreenMode] = useAtom(InImageFullScreenMode);
    // const [componentFirstInit] = useAtom(ImageGalleryInit);

    useEffect(() => {
        setCurrentText(() => upcomingText);
        // The description text is wrapped instantly when the new text changes that has a shorter length,
        // resulting in a displeasing visual effect. This is a workaround to prevent that.
        if (upcomingText.length < bgText.length && !inZoomMode)
            waitAsync(390).then(() => setBgText(() => upcomingText));
        else
            setBgText(() => upcomingText);
        return () => {
            uponExit?.();
            setIsExiting(true);
        };
    }, [upcomingText]);
    return <MotionFlex
        fontFamily={"Oswald"}
        fontSize={"18px"}
        className={"abs fw fh t0 z3 flex-col"}
        left={
            inImageFullScreenMode ?
                0 :
                "calc((100vh - 176px) / (438 / 154.29))"
        }
        maxW={
            inImageFullScreenMode ?
                "100vw" :
                "calc(100vw - (100vh - 176px) / (438 / 154.29) - clamp(100px, 20vw, 270px) - 10px)"
        }
        h={
            inImageFullScreenMode ?
                "100vh" :
                "calc(100vh - 176px)"
        }
        alignItems={"flex-start"}
        layout
    >
        {children}
        <MotionFlex
            bg={"#FDFD1F"}
            className={"z3 rel flex-col-rev"}
            initial={{ y: (() => {
                // Widget's dimension transition is distorted when set to a relative height.
                // Apparently, it's unfixable, partly because
                // the timing between ImageGallery's first initialization vs. this component's first initialization is different.
                // So, I've set the height to 101 since it's the maximum height of the text when it's fully expanded.
                // @min-res: 800x600
                return /* componentFirstInit ? "100%" : */ 101;
            })() }}
            animate={{
                y: 0,
                maxHeight: hideText ? "0%" : "100%",
            }}
            exit={{ y: /* "100%" */ 101 }}
            transition={{
                duration: 0.7,
                ease: SlowDown,
                y: {
                    duration: isExiting ? 1.2 : 0.7,
                    delay: isExiting ? 0.1 : 1,
                    ease: isExiting ? Forceful : SlowDown,
                },
            }}
            maxW={
                inImageFullScreenMode ?
                    "100vw" :
                    "calc(100vw - (100vh - 176px) / (438 / 154.29) - clamp(100px, 20vw, 270px) - 10px)"
            }
            alignSelf={(inZoomMode || inImageFullScreenMode) ? "stretch": "flex-start"}
            layout
        >
            <MotionBox
                p={hideText ? "0px 20px" : "10px 20px"}
                className={"rel overflow-hidden"}
                initial={{
                    y: 80
                }}
                animate={{
                    y: 0,
                    maxHeight: hideText ? "0%" : "100%",
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
                        className={"abs"}
                        as={"p"}
                        color={"#fff"}
                        layout={"position"}
                        initial={{
                            opacity: 0,
                            y: 20,
                            paddingRight: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            maxHeight: hideText ? "0%" : "100%",
                            transition: {
                                delay: 0.2,
                                duration: 0.5,
                                ease: SlowDown,
                                y: {
                                    duration: 0.7,
                                    delay: 0.2,
                                    ease: SlowDown,
                                }
                            },
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
                    animate={{
                        y: 0,
                        maxHeight: hideText ? "0%" : "100%",
                    }}
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
    </MotionFlex>;
};

interface IMainBackgroundProps {
    url?: string;
    unfocused?: boolean;
    overrideDelay?: number;
}
const MainBackground: FC<IMainBackgroundProps> = ({ url, unfocused = false, overrideDelay }) => {
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
                    delay: overrideDelay ?? 0.45,
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
}
export const ImagePicker: FC<IImagePickerProps> = ({
    imageArray,
    // initialImageIndex,
    onImageIndexChange,
    onImageFocusToggle,
}) => {
    const [inZoomMode, setInZoomMode] = useAtom(InZoomMode);
    const [isHovering, setIsHovering] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useAtom(ImageIndex);
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
                    {
                        const flip = !inZoomMode;
                        setInZoomMode(flip);
                        onImageFocusToggle?.(i, flip);
                    }
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


const ImageToolbar = () => {
    const [mouseMove, setMouseMove] = useAtom(MouseMoveInZoomMode);
    const [mouseTriggerTimeout, setMouseTriggerTimeout] = useAtom(MouseMoveInZoomModeTimeout);
    const [forceHover, setForceHover] = useState(false);

    const triggerMouse = useCallback(() => {
        if (mouseTriggerTimeout) {
            clearTimeout(mouseTriggerTimeout);
        }
        setMouseMove(true);
        setMouseTriggerTimeout(setTimeout(() => {
            setMouseMove(false);
            setMouseTriggerTimeout(null);
        }, 5000) as unknown as number);
    }, []);

    const commonTransition = {
        duration: 0.7,
        ease: Forceful
    };

    return <MotionFlex
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: mouseMove ? 1 : 0
        }}
        transition={{
            ...commonTransition,
            delay: mouseMove ? 0 : 1
        }}
        layout={"position"}
    >
        <DownloadIcon
            hoverAnimation
            overrideFG={"#eee"}
            animate={{
                width: 100,
                height: 100,
                opacity: .3,
            }}
            whileHover={{ opacity: 1 }}
            transition={commonTransition}
            layout={"position"}
        />
        <MagnifierIcon
            overrideFG={"#eee"}
            animate={{
                width: 100,
                height: 100,
                opacity: .3,
            }}
            whileHover={{ opacity: 1 }}
            transition={commonTransition}
            layout={"position"}
        />
    </MotionFlex>;
};

interface IIconProps {
    height?: number;
    width?: number;
    overrideFG?: string;
}

const MagnifierIcon: FC<IIconProps & MotionProps & { hoverAnimation?: boolean }> = ({ hoverAnimation, overrideFG, ...props }) => {
    // const [isHovered, setIsHovered] = useState(false);
    const [inImageFullScreenMode, setInImageFullScreenMode] = useAtom(InImageFullScreenMode);
    const commonTransition = {
        duration: 0.7,
        ease: Forceful
    };
    return <motion.svg
        viewBox="27.773 30.899 200.45 200.054"
        transition={commonTransition}
        onClick={() => setInImageFullScreenMode(!inImageFullScreenMode)}
        {...props}
        // {...(hoverAnimation ? {
        //     onHoverStart: () => setIsHovered(true),
        //     onHoverEnd: () => setIsHovered(false),
        // } : {})}
    >
        <motion.ellipse
            stroke={overrideFG ?? "#000"}
            fill={"none"}
            strokeWidth={21}
            cx="140.823" cy="113.291"
            rx="61.4" ry="61.392"/>
        <path stroke={overrideFG ?? "#000"} fill={overrideFG ?? "#000"} d="M 90.429 147.98 L 104.746 162.298 L 42.091 224.953 L 27.773 210.635 L 90.429 147.98 Z"></path>
    </motion.svg>;
};

const DownloadIcon: FC<IIconProps & MotionProps & { hoverAnimation?: boolean }> = ({ hoverAnimation = false, overrideFG, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);
    const imageData = useAtom(ImageData)[0];
    const imageIndex = useAtom(ImageIndex)[0];
    const commonTransition = {
        duration: 0.7,
        ease: Forceful
    };
    return <motion.svg
        viewBox="191.899 73.887 67.067 73.923"
        cursor={"pointer"}
        transition={commonTransition}
        onClick={() => window.open([...imageData.keys()][imageIndex])}
        style={{ mixBlendMode: "exclusion" }}
        {...props}
        {...(hoverAnimation ? {
            onHoverStart: () => setIsHovered(true),
            onHoverEnd: () => setIsHovered(false),
        } : {})}
    >
        <motion.g
            fill={overrideFG ?? "#000"}
            transition={commonTransition}
        >
            <motion.rect
                transition={commonTransition}
                x="220.568"
                animate={{
                    y: isHovered ? 73.887 + 10 : 73.887 - 2,
                    height: isHovered ? 55.054 - 10 : 55.054 + 2,
                }}
                width="9.039"
            />
            <motion.path
                animate={{
                    y: isHovered ? 3 : 0,
                }}
                transition={commonTransition}
                d="M 194.003 102.311 L 199.783 96.531 L 230.827 127.576 L 225.048 133.356 L 194.003 102.311 Z M 250.403 96.607 L 256.13 102.334 L 225.151 133.314 L 219.423 127.587 L 250.403 96.607 Z"
            />
        </motion.g>
        <path fill={overrideFG ?? "#000"} d="M 191.905 120.825 L 200.076 120.825 L 200.076 147.501 L 195.99 147.501 C 193.734 147.501 191.905 145.665 191.905 143.401 L 191.905 120.825 Z M 250.785 120.8 L 258.956 120.8 L 258.956 143.376 C 258.956 145.64 257.127 147.476 254.871 147.476 L 250.785 147.476 L 250.785 120.8 Z M 258.966 139.599 L 258.966 143.685 C 258.966 145.941 257.13 147.771 254.865 147.772 L 195.998 147.81 C 193.734 147.811 191.899 145.984 191.899 143.727 L 191.899 139.641 L 258.966 139.599 Z"></path>
    </motion.svg>;
};
