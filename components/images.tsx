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
export const ImageGalleryInit = atom(true);
const InZoomMode = atom(false);

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
    const [imageGalleryInit] = useAtom(ImageGalleryInit);
    const [triggeredByMenu, setTriggeredByMenu] = useState(false);

    const [inZoomMode] = useAtom(InZoomMode);
    const [currentImageIndex] = useAtom(ImageIndex);
    const locale = useLocale(useAtom(Language)[0], useAtom(LanguagePack)[0]);
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
                ...commonTransition,
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

    useEffect(() => {
        if (inZoomMode)
            void imageViewAnimController
                .start(
                    isPresent ? "expand" : "exit-outbound",
                    isPresent ? { ...commonTransition, delay: 1.2 } : undefined
                );
        else
            imageViewAnimController.set(isPresent ? "initial-outbound" : "initial-native");
        return () => {
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
                        <MotionBox
                            key={`image-zoom-${currentImageIndex}`}
                            className={"abs fw flex a-flex-center j-flex-center"}
                            m={"auto"}
                            layout={"position"}
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
                        />
                    </AnimatePresence>
                </MotionBox>
            </MotionBox>
        </ImageDesc>
    </>;
};

interface IImageZoomViewProps {
    imageUrl: string;
}
const ImageZoomView: FC<IImageZoomViewProps> = ({ imageUrl }) => {
    return <AnimatePresence>
        <MotionBox
            key={`url(${imageUrl.split("/").pop()})`}
            className={"fw flex a-flex-center j-flex-center"}
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
                `url(${imageUrl})`
            }
            style={{
                aspectRatio: "1920 / 1080",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        />
    </AnimatePresence>;
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
    const [componentFirstInit, setComponentFirstInit] = useAtom(ImageGalleryInit);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setComponentFirstInit(false);
        }, 500);
        setCurrentText(() => upcomingText);
        if (upcomingText.length < bgText.length && !inZoomMode)
            waitAsync(390).then(() => setBgText(() => upcomingText));
        else
            setBgText(() => upcomingText);
        return () => {
            clearTimeout(timeout);
            setIsExiting(true);
            uponExit?.();
        };
    }, [upcomingText]);
    return <MotionFlex
        fontFamily={"Oswald"}
        fontSize={"18px"}
        className={"abs fw fh b0 z3 flex-col-rev"}
        left={
            "calc((100vh - 176px) / (438 / 154.29))"
            // 0
        }
        maxW={
            "calc(100vw - (100vh - 176px) / (438 / 154.29) - clamp(100px, 20vw, 270px) - 10px)"
            // "100vw"
        }
        alignItems={"flex-start"}
        layout
    >
        <MotionFlex
            bg={"#FDFD1F"}
            className={"z3 flex-col overflow-hidden"}
            initial={{ y: componentFirstInit ? "100%" : 80 }}
            animate={{ y: 0 }}
            exit={{ y: componentFirstInit ? "100%" : 80 }}
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
            alignSelf={inZoomMode ? "stretch": "flex-start"}
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
        {children}
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
