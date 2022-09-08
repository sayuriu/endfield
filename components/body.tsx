import Image from 'next/image';
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Language, ImageData, LanguagePack } from "@states/global";
import { FC, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import bodyStyles from './body/Body.module.scss';
import { Logger } from "@utils/logger";
import { AnimFunctions } from "@utils/anims";
import { joinClasses, Nullable, useLocale } from "@utils/common";
import { LeftPanel } from "@components/body/left-panel";
import { RightPanel } from "@components/body/right-panel";
import { MotionBox, MotionFlex } from "@components/chakra-motion";
import { ImagePanel } from "@components/Images";

const { Forceful, SpeedUp } = AnimFunctions;

export const Body = () => {
    const locale = useLocale(useAtom(Language)[0], useAtom(LanguagePack)[0]);
    const [imageData] = useAtom(ImageData);
    const imageArray = useMemo(() => [...imageData.entries()], []);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentImageURL, setCurrentImageURL] = useState("assets/img/05_HD.jpg");
    const changePage = (to: number) => {
        if (to === currentPage) return;
        setCurrentPage(to);
    };

    useEffect(() => {
        const interval = setInterval(() => {});

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (<MotionBox
        h="calc(100vh - 176px)"
        w="100vw"
        p={0}
        className={joinClasses(bodyStyles["content"], "rel grid overflow-hidden")}
        layout
    >
        <Slideshow url={currentImageURL}/>
        <DesktopPanel
            LPanelOnIndexAnimStart={(from, to) => changePage(to)}
            LPanelIndexChange={setCurrentPage}
            RPanelCurrentIndex={currentPage}
            InitialIndex={currentPage}
        />
        <AnimatePresence>
            {currentPage === 1 && <>
                <SectionTitle text={locale("content.main.1.title")}/>
                <InfoDialogue/>
            </>}
        </AnimatePresence>
        <AnimatePresence>
            {currentPage === 2 && <>
                <SectionTitle text={"RFPD"}/>
            </>}
        </AnimatePresence>
        <AnimatePresence>
            {currentPage === 3 && <>
                <ImagePanel key={"imagePanel"} initialImageURL={currentImageURL.startsWith("blob") ? currentImageURL : imageData.get(currentImageURL)} onImageChange={(newImageURL) => setCurrentImageURL(() => newImageURL)}/>
                <ImageDesc key={"imageDesc"} text={locale(`image-desc.${(currentImageURL.startsWith("blob") ? imageArray.find((v) => v[1] === currentImageURL)?.[0] : currentImageURL)?.split("/").pop()?.split(".")[0]}`)}/>
                {/*<ImageCounter key={"imageCounter"} current={imageArray.findIndex((v) => v[1] === currentImageURL) + 1} total={imageArray.length}/>*/}
            </>}
        </AnimatePresence>
    </MotionBox>);
};

interface IImageCountProps {
    current: number;
}

const ImageCounter: FC<IImageCountProps> = ({ current }) => {
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
            ease: AnimFunctions.Forceful,
        }}
    >
        <span>{stringified[0]}</span>
        <span>{stringified[1]}</span>
    </MotionBox>;
};

interface IImageDescProps {
    text: string;
}

const ImageDesc: FC<IImageDescProps> = ({ text }) => {
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => setIsExiting(true), []);
    return <MotionFlex
        fontFamily={"Oswald"}
        fontSize={"18px"}
        bg={"#FDFD1F"}
        className={"abs b0 z3 a-flex-center"}
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
            ease: AnimFunctions.Forceful,
            y: {
                duration: isExiting ? 1.2 : 0.7,
                delay: isExiting ? 0.1 : 1,
                ease: isExiting ? AnimFunctions.Forceful : AnimFunctions.SlowDown,
            },
        }}
        left={"calc((100vh - 176px) / (438 / 154.29))"}
        maxW={"calc(100vw - (100vh - 176px) / (438 / 154.29) - clamp(100px, 20vw, 270px) - 10px)"}
        layout={"size"}
    >
        <MotionBox
            p={"10px 20px"}
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
                ease: AnimFunctions.Forceful,
                y: {
                    duration: isExiting ? 1.2 : 0.7,
                    delay: isExiting ? 0 : 0.7,
                    ease: isExiting ? AnimFunctions.Forceful : AnimFunctions.SlowDown,
                },
            }}
            bg={"#000"}
            layout={"size"}
            overflow={"hidden"}
        >
            <MotionBox
                as={"p"}
                color={"#fff"}
                layout={"position"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    y: {
                        duration: 0.7,
                        delay: 0.2,
                        ease: AnimFunctions.SlowDown,
                    }
                }}
            >
                {text}
            </MotionBox>
        </MotionBox>
    </MotionFlex>;
};

const DescriptionToggleBtn: FC<{ onClick: (active: boolean) => void, initial: boolean }> = ({ onClick, initial }) => {
    const [isOpen, setIsOpen] = useState(initial);
    const HandleClick = () => {
        setIsOpen(!isOpen);
        onClick(!isOpen);
    };
    return (
        <motion.button
            animate={{
                backgroundColor: "#D9D9D9",
                boxShadow: "#000 0px 0px 20px 0px",
            }}
            className={"fw z1 abs b0 l0"}
            onClick={HandleClick}
            layout={"size"}
        >
            <MotionBox
                as={"p"}
                w={"100%"}
                fontFamily={"Oswald"}
                fontWeight={"bold"}
                color={"#000"}
                textAlign={"left"}
                p={"0.8ch"}
                pl={"2ch"}
                layout={"position"}
            >
                {isOpen ? "LESS" : "MORE"}
            </MotionBox>
        </motion.button>
    );
};

const SectionTitle = ({ text }: { text: string }) => {
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => () => setIsExiting(true) , []);
    const transition = {
        x: {
            duration: isExiting ? 1.55 : 1.7,
            ease: isExiting ? SpeedUp : Forceful,
        },
        opacity: {
            duration: 0.5,
            ease: Forceful,
        }
    };
    return (
        <MotionBox
            m={"auto 0 13.5rem auto"}
            initial={{
                // mixBlendMode: "exclusion",
                x: "70vw",
            }}
            animate={{ x: "0" }}
            exit={{
                x: "-80vw",
                opacity: 0,
            }}
            transition={transition}
            className={joinClasses(bodyStyles["desc-1-title"], "z1 no-pointer")}
        >
            <Box
                as={"p"}
                fontFamily={"Oswald"}
                fontWeight={"bold"}
                fontSize={"100"}
                color={"#fff"}
                textAlign={"left"}
                p={"0.8ch"}
                pl={"2ch"}
                mixBlendMode={"exclusion"}
                whiteSpace={"nowrap"}
            >
                {text}
            </Box>
        </MotionBox>
    );
};

const InfoDialogue = () => {
    const locale = useLocale(useAtom(Language)[0], useAtom(LanguagePack)[0]);
    const [isExiting, setIsExiting] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    useEffect(() => () => {
        setIsShowing(false);
        setIsExiting(true);
    }, []);
    const transition = {
        duration: isExiting ? 1.5 : 1.7,
        ease: Forceful,
    };
    return (
        <motion.div
            initial={{
                y: "70vh",
                flexGrow: 1,
                margin: "auto 2vh 4vh auto",
                maxHeight: "calc(100% - 4vh)",
                width: "min(650px, 80vw)",
            }}
            animate={{ y: "0vh" }}
            exit={{ y: "70vh" }}
            transition={transition}
            className={joinClasses(bodyStyles["desc-1"], "overflow-hidden rel z1")}
            key={"desc-1"}
        >
            <motion.div
                initial={{
                    color: "#000",
                    width: "100%",
                    padding: "1em 0.8em",
                    marginBottom: "1.2em",
                    fontFamily: "Oswald",
                    fontWeight: "lighter",
                    fontSize: "1.3em",
                    backgroundColor: "#E8E8E8",
                }}
                layout={"position"}
                className={"overflow-auto-y z0"}
            >
                {locale("content.main.1.desc.summary")}
                {
                    isShowing &&
                    <>
                        {locale("content.main.1.desc.ext").split("\n").map(line => (
                            <>
                                <br/>{line}
                            </>
                        ))}
                    </>
                }
            </motion.div>
            <DescriptionToggleBtn onClick={setIsShowing} initial={isShowing}/>
        </motion.div>
    );
};

interface IDesktopPanelProps {
    LPanelIndexChange: (index: number) => void;
    LPanelOnIndexAnimStart: (from: number, to: number) => void;
    RPanelCurrentIndex: number;
    InitialIndex?: number;
}
const DesktopPanel: FC<IDesktopPanelProps> = ({ LPanelOnIndexAnimStart, LPanelIndexChange, RPanelCurrentIndex, InitialIndex }) => {
    const [isPortrait, setIsPortrait] = useState(false);
    const listener = () => {
        const portrait = window.innerHeight / window.innerWidth < 1165 / 967;
        if (isPortrait !== portrait)
            setIsPortrait(_current => portrait !== _current ? portrait : _current);
    };
    useEffect(() => {
        listener();
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, [isPortrait]);
    return (
        <AnimatePresence>
            {isPortrait && <>
                <LeftPanel onIndexChange={LPanelIndexChange} onIndexAnimStart={LPanelOnIndexAnimStart} initIndex={InitialIndex}/>
                <RightPanel currentIndex={RPanelCurrentIndex}/>
            </>}
        </AnimatePresence>
    );
};


interface ISlideshowProps {
    url?: string;
}

const Slideshow: FC<ISlideshowProps> = ({ url }) => {
    return (
        <AnimatePresence>
            <motion.div
                key={url}
                className={joinClasses(bodyStyles["preview-background"], "fh z0 overflow-hidden")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: Forceful }}
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

const OverviewScreen = () => {
    return (
        <motion.div>

        </motion.div>
    );
};
