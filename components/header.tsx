import { FC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import { AnimFunctions } from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import {LogoSmall_CN} from "@components/logo/CN/CN-small";
import { Nullable, waitAsync } from "@utils/common";
import {LogoSmall_EN} from "@components/logo/EN/EN-small";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { Language } from "@states/global";
import SlowDown = AnimFunctions.SlowDown;

function resolveConfig(lang: Nullable<string>)
{
    switch (lang)
    {
        case "cn":
            return {
                marginLeft: "4%",
                height: "80%"
            };
        case "en":
            return {
                marginLeft: "3%",
                height: "85%"
            };
        default:
            return {
                marginLeft: "auto",
                height: "85%"
            };
    }
}

export const Header: FC = () => {
    const router = useRouter();
    const [logoOpacity, setLogoOpacity] = useState(1);
    const [currentLanguage, setCurrentLanguage] = useAtom(Language);
    const [langOptionVisible, setLangOptionVisible] = useState(false);

    return (
        <AnimatePresence>
            <motion.div
                className={"abs l0"}
                initial={{ top: -90 }}
                animate={{ top: 0 }}
                transition={{ duration: 0.5, ease: Forceful }}
            >
                <Box
                    h={"88px"}
                    w={"100vw"}
                    bg={"#000"}
                    borderBottom={"1px solid #fff"}
                    className={"rel flex a-flex-center j-flex-space-between"}
                >
                    <Box {...resolveConfig(currentLanguage)}>
                            {currentLanguage === 'cn' && <LogoSmall_CN opacity={logoOpacity} key={"logo-endfield-cn-smol"}/>}
                            {currentLanguage === 'en' && <LogoSmall_EN opacity={logoOpacity} key={"logo-endfield-cn-smol"}/>}
                    </Box>
                    <div/>
                    <AnimatePresence>
                        {langOptionVisible &&
                        <Settings
                            key={"settings"}
                            onLangChange={async (newLang) => {
                                if (newLang === currentLanguage) return;
                                setLogoOpacity(0);
                                await waitAsync(450);
                                router.query.lang = newLang;
                                await router.push({
                                    pathname: router.pathname,
                                    query: {
                                        ...router.query,
                                        lang: newLang
                                    }
                                }, undefined, { shallow: true });
                                setCurrentLanguage(newLang);
                                setLogoOpacity(1);
                            }}
                        />}
                    </AnimatePresence>
                    <motion.button
                        variants={variants}
                        initial={"langBtn"}
                        // whileHover={"langBtnHover"}
                        onClick={() => setLangOptionVisible(!langOptionVisible)}
                    >
                        <Box fontFamily={"Jetbrains Mono"} p={4} style={{ mixBlendMode: 'difference'}}>SETTINGS</Box>
                    </motion.button>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
};
const variants = {
    langBtn: {
        opacity: 1,
        color: "#fff",
        backgroundColor: "#000",
    },
    langBtnHover: {
        color: "#000",
        backgroundColor: "#fff",
    },
};
const settingsUIVariant = {
    UIHidden: {
        // clipPath: "polygon(0 0, 0 0, 100% 0, 100% 0)",
        opacity: 0,
        transition: {
            delay: 0.3,
            duration: 0.5,
            ease: Forceful,
            when: "afterChildren",
            staggerChildren: 0.3
        }
    },
    UIVisible: {
        // clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: Forceful,
            when: "beforeChildren",
            staggerChildren: 0.3
        }
    },
    childHidden: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.5,
            ease: Forceful
        }
    },
    childVisible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3,
            duration: 0.5,
            ease: SlowDown,
        }
    }
};

interface SettingsProps {
    onLangChange: (newLang: string) => void;
    // visible: boolean;
}

const childStyles = {
    padding: "92px 7px 5px 7px",
    gap: "10px",
};

const Settings: FC<SettingsProps> = ({ onLangChange }) => {
    const lang = ["cn", "en"];
    return (
        <motion.div
            className={"abs r0 t0 flex flex-col"}
            variants={settingsUIVariant}
            initial={"UIHidden"}
            animate={"UIVisible"}
            exit={"UIHidden"}
            style={{ background: "#fff", color: "#000" }}
            layout
        >
            <motion.div
                className={"fw flex a-flex-center j-flex-space-between"}
                style={childStyles}
                variants={settingsUIVariant}
                initial={"childHidden"}
                animate={"childVisible"}
            >
                <Box as={"p"} fontFamily={"Jetbrains Mono"} p={4}>Language</Box>
                <Box fontFamily={"Jetbrains Mono"} p={4}>
                    {lang.map((_lang, i) => (
                        <motion.button
                            key={i}
                            onClick={() => onLangChange(_lang)}
                            variants={variants}
                            initial={"langBtn"}
                            whileHover={"langBtnHover"}
                        >
                            {_lang}
                        </motion.button>
                    ))}
                </Box>
            </motion.div>
        </motion.div>
    );
};

