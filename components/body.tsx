import Image from 'next/image';
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Language, ImageData, LanguagePack, IsPortrait } from "@states/global";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import bodyStyles from './body/Body.module.scss';
import { Logger } from "@utils/logger";
import { Forceful, SpeedUp } from "@utils/anims";
import { joinClasses, useLocale } from "@utils/common";
import { LeftPanel } from "@components/body/left-panel";
import { RightPanel } from "@components/body/right-panel";
import { MotionBox } from "@components/motion";
import { ImageGallery, ImageGalleryInit, InImageFullScreenMode } from "@components/images";

export const Body = () => {
    // const [imageData] = useAtom(ImageData);
    const [inImageFullScreenMode] = useAtom(InImageFullScreenMode);
    const locale = useLocale(useAtom(Language)[0], useAtom(LanguagePack)[0]);
    const [, setGalleryInit] = useAtom(ImageGalleryInit);

    const [currentPage, setCurrentPage] = useState(1);
    const changePage = (to: number) => {
        if (to === currentPage) return;
        if (to !== 3)
            setGalleryInit(false);
        setCurrentPage(to);
    };
    const [isPortrait, setIsPortrait] = useAtom(IsPortrait);
    const listener = () => {
        const newPortraitState = window.innerHeight / window.innerWidth < 1165 / 967;
        if (isPortrait !== newPortraitState)
            setIsPortrait(newPortraitState);
    };

    useEffect(() => {
        listener();
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        };
    }, [isPortrait]);
    return (<MotionBox
        h={
            inImageFullScreenMode ?
                "calc(100vh - 0px)" :
                "calc(100vh - 176px)"
        }
        w="100vw"
        p={0}
        transition={{ duration: 0.7, ease: Forceful }}
        className={joinClasses(bodyStyles["content"], "rel grid overflow-hidden")}
        layout
    >
        <DesktopPanel
            LPanelOnIndexAnimStart={(from, to) => changePage(to)}
            LPanelIndexChange={(newPageIndex) => {
                setCurrentPage(newPageIndex);
            }}
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
        {/*<ImageGallery initialImageURL={imageData.get("assets/img/bg.jpg")!} present={currentPage === 3}/>*/}
        <ImageGallery currentPage={currentPage}/>
    </MotionBox>);
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
    // const []
    const [isPortrait] = useAtom(IsPortrait);
    useEffect(() => {}, [isPortrait]);
    return (
        <AnimatePresence>
            {isPortrait && <>
                <LeftPanel onIndexChange={LPanelIndexChange} onIndexAnimStart={LPanelOnIndexAnimStart} initIndex={InitialIndex}/>
                <RightPanel currentIndex={RPanelCurrentIndex}/>
            </>}
        </AnimatePresence>
    );
};



const OverviewScreen = () => {
    return (
        <motion.div>

        </motion.div>
    );
};
