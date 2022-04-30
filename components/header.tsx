import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { AnimFunctions } from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import SlowDown = AnimFunctions.SlowDown;
import { LogoSmall_CN } from "@components/logo/CN/CN-small";
import { LogoSmall_EN } from "@components/logo/EN/EN-small";
import { Checkbox } from "@components/checkbox";
import { Language } from "@states/global";
import { localGet, localSet, Nullable, OverridableStyle, waitAsync } from "@utils/common";

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
    const [currentLanguage, setCurrentLanguage] = useAtom(Language);
    const [logoOpacity, setLogoOpacity] = useState(1);
    const [settingsUIVisible, setSettingsUIVisible] = useState(false);

    let HoverTimeout: Nullable<ReturnType<typeof setTimeout>> = null;
    let ToggleTimeout = false;
    const handleToggle = (newState: boolean, hover = false) => {
        if (ToggleTimeout && !hover)
            return;
        if (!hover)
        {
            setSettingsUIVisible(newState);
            ToggleTimeout = true;
            setTimeout(() => {
                ToggleTimeout = false;
            }, 500);
        }
        else {
            HoverTimeout = setTimeout(() => {
                setSettingsUIVisible(newState);
                HoverTimeout = null;
            }, 500);
        }
    };

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
                    <Box
                        className={"flex a-flex-center"}
                        fontFamily={"Jetbrains Mono"}
                        onMouseLeave={() => handleToggle(false, true)}
                        onMouseEnter={() => {
                            if (HoverTimeout)
                                clearTimeout(HoverTimeout);
                            HoverTimeout = null;
                        }}
                    >
                        <AnimatePresence>
                            {settingsUIVisible &&
                                <SettingsUI
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
                                />
                            }
                        </AnimatePresence>
                        <SettingsToggle
                            active={settingsUIVisible}
                            onClick={() => handleToggle(!settingsUIVisible)}
                        />
                    </Box>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
};

interface ISettingsToggle {
    active: boolean;
    onClick: () => void;
}

const SettingsToggle: FC<ISettingsToggle> = ({ active, onClick }) => {
    const [isHover, setIsHover] = useState(false);
    const transition = {
        duration: 0.5,
        ease: Forceful
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={"rel exclusion"}
        >
            <Box as={"p"} padding={"0.5rem 1.5rem 0.5rem 0.5rem"} color={"#fff"}>
                ⚙ SETTINGS
            </Box>
            <motion.div
                className={"abs fh t0 r0"}
                animate={{
                    background: "#fff",
                    width: "0.5em",
                    x: (active || isHover) ? 0 : "0.5em",
                }}
                transition={transition}
            />
        </button>
    );
};


const settingsUIStates = {
    hidden: {
        y: "-100%",
        transition: {
            delay: 0.12,
            duration: 0.5,
            ease: Forceful,
        }
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.5,
            ease: Forceful,
            staggerChildren: 0.3,
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
const SettingsItem: FC<{ children?: ReactNode } & OverridableStyle> = (
    {
        children = null,
        overrideStyles
    }
) => {
    return (
        <motion.div
            className={"rel fw flex a-flex-center j-flex-space-between"}
            style={{
                padding: "4px",
                ...overrideStyles
            }}
            variants={settingsUIStates}
            initial="childHidden"
            animate="childVisible"
            exit="childHidden"
        >
            {children}
        </motion.div>
    );
};

interface ISettings {
    onLangChange: (newLang: string) => void;
}
const SettingsUI: FC<ISettings> = ({ onLangChange }) => {
    const [lang] = useAtom(Language);
    const router = useRouter();
    const [fullIntro, setFullIntro] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(lang);
    const availableLangs = [
        "CN",
        "EN",
        // "JP",
        // "KR"
    ];
    const btnVariants = {
        langBtn: {
            opacity: 1,
            color: "#fff",
            backgroundColor: "#000",
        },
        langBtnHover: {
            color: "#000",
            backgroundColor: "#fff",
        },
        langBtnInactive: {
            color: "#fff",
            backgroundColor: "#626262",
        }
    };

    const updateLanguage = (newLang: string) => {
        setCurrentLanguage(newLang);
        onLangChange(newLang);
    };

    useEffect(() => {
        setFullIntro(localGet("fullIntro") === "true");
    }, [fullIntro, currentLanguage]);

    const fullIntroSTChange = (newValue: boolean) => {
        setFullIntro(newValue);
        localSet("fullIntro", (newValue).toString());
        void router.push({
            pathname: "/",
            query: Object.assign({ lang: currentLanguage }, newValue ? { fullIntro: "true" } : {})
        }, undefined, { shallow: true });
    };

    return (
        <motion.div
            variants={settingsUIStates}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            className={"abs t0 r0 flex flex-col"}
            style={{ background: "#fff" }}
            layout
        >
            <Box className={"fw"} h={1} padding={"82px 7px 5px 7px"}/>
            <SettingsItem>
                <Box as={"p"} fontFamily={"Jetbrains Mono"} p={4}>Language</Box>
                <Box fontFamily={"Jetbrains Mono"} p={4} className={"flex"}>
                    {availableLangs.map((_lang, i) => {
                        const sameLanguage = _lang.toLowerCase() === currentLanguage;
                        return (
                            <motion.button
                                key={i}
                                onClick={() => updateLanguage(_lang.toLowerCase())}
                                variants={btnVariants}
                                initial={sameLanguage ? "langBtnInactive" : "langBtn"}
                                whileHover={sameLanguage ? "langBtnInactive" : "langBtnHover"}
                                animate={sameLanguage ? "langBtnInactive" : "langBtn"}
                                className={sameLanguage ? "no-pointer" : ""}
                                style={{padding: "0.1em"}}
                            >
                                {_lang}
                            </motion.button>
                        );
                    })}
                </Box>
            </SettingsItem>
            <SettingsItem overrideStyles={{ paddingTop: 0, paddingBottom: 8 }}>
                <Box paddingLeft={4}>Full intro sequence</Box>
                <Box paddingInline={4}>
                    <Checkbox
                        checked={fullIntro}
                        h={"25px"}
                        w={"26px"}
                        onChange={fullIntroSTChange}
                        bg={"#fff"}
                    />
                </Box>
                <Box as={"i"} className={"abs"} fontSize={"0.75rem"} top={"73%"} left={4}>
                    Plays every 24hr from last login
                </Box>
            </SettingsItem>
            <Box className={"fw"} h={1} padding={"7px"}/>
        </motion.div>
    );
};
