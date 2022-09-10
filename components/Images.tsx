import { useAtom } from "jotai";
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion, MotionProps, useAnimation, usePresence } from "framer-motion";
import { Box, Flex } from "@chakra-ui/react";
import { ImageData, Language, LanguagePack } from "@states/global";
import { MotionBox, MotionFlex, MotionImage } from "@components/motion";
import { AnimFunctions } from "@utils/anims";
import { joinClasses, Nullable, useLocale } from "@utils/common";
import { Logger } from "@utils/logger";
import bodyStyles from "@components/body/Body.module.scss";

const { SlowDown, Forceful } = AnimFunctions;

interface ISlideshowProps {
    url?: string;
    unfocused?: boolean;
}

const Slideshow: FC<ISlideshowProps> = ({ url, unfocused = false }) => {
    return (
        <AnimatePresence>
            <motion.div
                key={url}
                className={joinClasses(bodyStyles["preview-background"], "abs t0 l0 fh fw z0 overflow-hidden")}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    filter: unfocused ? "blur(5px)" : "blur(0px)",
                }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.5,
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
            </motion.div>
        </AnimatePresence>
    );
};

interface IImageGalleryProps {
    present: boolean;
    initialImageURL: string;
}

export const ImageGallery: FC<IImageGalleryProps> = ({ present, initialImageURL }) => {
    const locale = useLocale(useAtom(Language)[0], useAtom(LanguagePack)[0]);
    const [imageData] = useAtom(ImageData);
    const [isZoomed, setIsZoomed] = useState(false);
    const [currentImageURL, setCurrentImageURL] = useState(initialImageURL);
    const imageArray = useMemo(() => [...imageData.entries()], []);

    const toggleZoom = async () => {
        setIsZoomed((wasZoomed) => {
            console.log("wasZoomed", wasZoomed);
            return !wasZoomed;
        });
    };

    return <AnimatePresence>
        <Slideshow key={"slideshow"} url={currentImageURL} unfocused={isZoomed && present}/>
        {present && <>
            <ImagePanel
                key={"imagePanel"}
                isFocused={isZoomed}
                initialImageURL={currentImageURL.startsWith("blob") ? currentImageURL : imageData.get(currentImageURL)}
                onImageChange={(newImageURL) => setCurrentImageURL(newImageURL)}
                onImageFocusRequest={toggleZoom}
            />
            <ImageDesc
                imageFocus={isZoomed}
                key={"imageDesc"}
                imageURL={currentImageURL}
                text={locale(`image-desc.${(currentImageURL.startsWith("blob") ? imageArray.find((v) => v[1] === currentImageURL)?.[0] : currentImageURL)?.split("/").pop()?.split(".")[0]}`)}
            >
                <Box flexGrow={1} className={"rel"}>
                    <ImageView imageURL={currentImageURL}/>
                </Box>
            </ImageDesc>
            {/*<ImageCounter key={"imageCounter"} current={imageArray.findIndex((v) => v[1] === currentImageURL) + 1} total={imageArray.length}/>*/}
            <MotionBox>

            </MotionBox>
        </>}
    </AnimatePresence>;
};

interface IImagePanelProps {
    initialImageURL?: string;
    onImageChange?: (url: string) => void;
    onImageFocusRequest?: (url: string) => void;
    isFocused?: boolean;
}
export const ImagePanel: FC<IImagePanelProps> = ({ initialImageURL, onImageChange, onImageFocusRequest, isFocused = false }) => {
    const [imageData] = useAtom(ImageData);
    const [isExiting, setIsExiting] = useState(false);
    const imageArray = useMemo(() => [...imageData.values()], []);

    let hasPredeterminedImage = false;
    const [currentImageIndex, setCurrentImageIndex] = useState<Nullable<number>>((() => {
        if (!initialImageURL) return null;
        const target = imageArray.find(v => initialImageURL.endsWith(v) || v.endsWith(initialImageURL));
        if (target !== undefined) hasPredeterminedImage = true;
        return target === undefined ? null : imageArray.indexOf(target);
    })());

    const [preInit, setPreInit] = useState(hasPredeterminedImage); // ONCE
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
        setPreInit(false);
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
        onHoverEnd={() => updateHoverIndex(null)}
    >
        {imageArray.map((imageURL, i) =>
            <Image2
                trackIndex={currentImageIndex}
                hoverIndex={currentHoveredIndex}
                previousHoverIndex={prevHoveredIndex}
                isCurrent={currentImageIndex === i}
                key={`gallery-img-${i}`}
                inFocus={isFocused}
                onClick={() => {
                    setCurrentImageIndex(() => {
                        onImageChange?.(imageURL);
                        return i;
                    });
                    if (currentImageIndex === i)
                        onImageFocusRequest?.(imageURL);
                    }}
                onHoverCapture={() => updateHoverIndex(i)}
                isHoveredOutbound={currentHoveredIndex === i}
                src={imageURL}
                preInit={preInit}
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
                    width: "0%",
                }}
                animate={{
                    width: "20%",
                    background: isHovered ?
                        "linear-gradient(-90deg, rgba(253, 253, 31, 0) 0%, rgba(253, 253, 31, 1) 0%)" :
                        "linear-gradient(-90deg, rgba(253, 253, 31, 0) 0%, rgba(253, 253, 31, 1) 100%)",
                }}
                exit={{
                    width: "0%",
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

interface IImageCountProps {
    current: number;
}
export const ImageCounter: FC<IImageCountProps> = ({ current }) => {
    const stringified = current.toString().padStart(2, "0");
    return <MotionBox
        className={"abs l0 b0 z4"}
        fontFamily={"Orbitron"}
        fontSize={"3.5rem"}
        fontWeight={"bold"}
        initial={{
            y: 80
        }}
        animate={{
            y: 0
        }}
        exit={{
            y: 80
        }}
        transition={{
            duration: 0.7,
            delay: 0.15,
            ease: Forceful,
        }}
    >
        <span>{stringified[0]}</span>
        <span>{stringified[1]}</span>
    </MotionBox>;
};

interface IImageDescProps {
    text: string;
    imageURL?: string;
    imageFocus?: boolean;
    exited?: boolean;
    children?: ReactNode;
}
export const ImageDesc: FC<IImageDescProps> = ({ text , imageFocus = false, imageURL, exited = false, children }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [prevText, setPrevText] = useState<Nullable<string>>(text);
    useEffect(() => {
        let timeout = setTimeout(() => setPrevText(() => text), 500);
        return () => {
            clearTimeout(timeout);
            setIsExiting(true);
        };
    }, [text]);
    return <Flex
        fontFamily={"Oswald"}
        fontSize={"18px"}
        className={"abs fh fw b0 z3 flex-col"}
        left={"calc((100vh - 176px) / (438 / 154.29))"}
        maxW={"calc(100vw - (100vh - 176px) / (438 / 154.29) - clamp(100px, 20vw, 270px) - 10px)"}
        alignItems={imageFocus ? "stretch" : "flex-start"}
    >
        {children}
        <MotionFlex
            bg={"#FDFD1F"}
            className={"b0 z3 flex-col"}
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
                {/*<MotionBox*/}
                {/*    className={"abs l0 bfull z1 overflow-hidden"}*/}
                {/*    isolation={"isolate"}*/}
                {/*    initial={{*/}
                {/*        whiteSpace: "nowrap",*/}
                {/*        height: 100,*/}
                {/*    }}*/}
                {/*    animate={{*/}
                {/*        width: 100,*/}
                {/*        background: "linear-gradient(90deg, hsla(0deg, 100%, 0%, 1) 20%, hsla(0deg, 100%, 100%, 0) 100%)",*/}
                {/*    }}*/}
                {/*    as={"button"}*/}
                {/*    layout={"position"}*/}
                {/*    transition={{*/}
                {/*        duration: 1,*/}
                {/*        ease: Forceful*/}
                {/*    }}*/}
                {/*    whileHover={{*/}
                {/*        width: 120,*/}
                {/*        background: "linear-gradient(90deg, hsla(0deg, 100%, 0%, 1) 100%, hsla(0deg, 100%, 100%, 0) 100%)",*/}
                {/*        transition: {*/}
                {/*            duration: .7,*/}
                {/*            ease: SlowDown*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    onHoverStart={() => setIsZoomButtonHovered(true)}*/}
                {/*    onHoverEnd={() => setIsZoomButtonHovered(false)}*/}
                {/*    onClick={onZoomClicked}*/}
                {/*>*/}
                {/*</MotionBox>*/}
                <AnimatePresence>
                    <MotionBox
                        key={`text-desc-${text[0]}-${text.length}`}
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
                        {text}
                    </MotionBox>
                    <MotionBox
                        key={`text-desc-${text[0]}-${text[2]}-${text.length}`}
                        className={"abs rfull overflow-hidden"}
                        as={"p"}
                        color={"#000"}
                        layout={"position"}
                        initial={{
                            opacity: 0,
                            y: 20,
                            paddingRight: 5,
                            mixBlendMode: "exclusion"
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
                        {text.length}
                    </MotionBox>
                </AnimatePresence>
                <MotionBox
                    as={"p"}
                    color={"#fff"}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ y: 0 }}
                    transition={{
                        delay: prevText?.length ?? 0 < text.length ? 0.2 : 0.5,
                        ease: Forceful,
                        duration: 1,
                        y: {
                            duration: 0.7,
                            delay: 0.2,
                            ease: SlowDown,
                        },
                    }}
                >
                    {text}
                </MotionBox>
            </MotionBox>
        </MotionFlex>
    </Flex>;
};

interface IImageViewProps {
    imageURL: string;
}

const ImageView: FC<IImageViewProps> = ({ imageURL }) => {
    const containerVariants = {
        init: {
            opacity: 0,
            transition: {
                duration: 0.7,
            }
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.7,
                delay: 0.5,
                when: "beforeChildren",
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.7,
                delay: 0,
                when: "afterChildren",
            }
        }
    };
    return <MotionBox
        bg={"hsla(0, 0%, 0%, 0.5)"}
        className={"fh fw rel"}
        backdropFilter={"blur(10px)"}
        initial={"init"}
        animate={"visible"}
        exit={"exit"}
        variants={containerVariants}
    >
        {/*<Image*/}
        {/*    src={imageURL!}*/}
        {/*    layout={"fill"}*/}
        {/*    objectFit={"contain"}*/}
        {/*    objectPosition={"center"}*/}
        {/*    style={{*/}
        {/*        width: "100%",*/}
        {/*        height: "100%",*/}
        {/*    }}*/}
        {/*/>*/}
    </MotionBox>;
};
