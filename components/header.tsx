import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { AnimFunctions } from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import SlowDown = AnimFunctions.SlowDown;
import { LogoSmall_CN } from "@components/logo/CN/CN-small";
import { LogoSmall_EN } from "@components/logo/EN/EN-small";
import { Checkbox } from "@components/checkbox";
import { AvailableLanguages, Language } from "@states/global";
import { localGet, localSet, Nullable, OverridableStyle, useLocale } from "@utils/common";
import { LogoSmall_JP } from "@components/logo/JP/JP-small";

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
        case "jp":
            return {
            marginLeft: "2.5%",
            height: "85%"
        };
        default:
            return {
                marginLeft: "auto",
                height: "85%"
            };
    }
}

const transition = {
    duration: 0.5,
    ease: Forceful
};

export const Header: FC = () => {
    const router = useRouter();
    const [currentLanguage, setCurrentLanguage] = useAtom(Language);
    const [settingsUIVisible, setSettingsUIVisible] = useState(false);
    const [logoStyle, setLogoStyle] = useState(currentLanguage);

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
                    <Box {...resolveConfig(logoStyle)}>
                        <AnimatePresence
                            exitBeforeEnter
                            onExitComplete={() => setLogoStyle(currentLanguage)}
                        >
                            {currentLanguage === 'cn' && <LogoSmall_CN key={"logo-endfield-cn-smol"}/>}
                            {currentLanguage === 'en' && <LogoSmall_EN key={"logo-endfield-en-smol"}/>}
                            {currentLanguage === 'jp' && <LogoSmall_JP key={"logo-endfield-jp-smol"}/>}
                        </AnimatePresence>
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
                                        router.query.lang = newLang;
                                        await router.push({
                                            pathname: router.pathname,
                                            query: {
                                                ...router.query,
                                                lang: newLang
                                            }
                                        }, undefined, { shallow: true });
                                        setCurrentLanguage(newLang);
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
    const locale = useLocale(useAtom(Language)[0]);
    const [isHover, setIsHover] = useState(false);
    const [isSmall, setIsSmall] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (isSmall === window.innerWidth < 720) return;
            setIsSmall(window.innerWidth < 720);
        });
    }, [window.innerWidth]);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={"rel exclusion"}
        >
            <motion.div
                animate={{
                    padding: "0.5rem 1.5rem 0.5rem 0.5rem",
                    gap: "2px",
                    color: "#fff",
                }}
                className={"flex a-flex-center j-flex-center"}
                transition={transition}
                layout
            >
                <SettingsIcon/>
                <AnimatePresence>
                    {!isSmall &&
                        <motion.p
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={transition}
                            style={{whiteSpace: "nowrap", overflow: "hidden"}}
                            layout
                        >
                            {locale("settings.label")}
                        </motion.p>
                    }
                </AnimatePresence>
            </motion.div>
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
            ...transition,
        }
    },
    visible: {
        y: 0,
        transition: {
            ...transition,
            staggerChildren: 0.3,
        }
    },
    visibleSmall: {
        y: 88,
        transition,
    },
    childHidden: {
        opacity: 0,
        y: -10,
        transition,
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
    const locale = useLocale(lang);
    const router = useRouter();
    const [fullIntro, setFullIntro] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(lang);

    const availableLangs = AvailableLanguages.map(l => l.toUpperCase());
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
            query: Object.fromEntries(Object.entries({
                lang: currentLanguage,
                fullIntro: newValue ? newValue : undefined
            }).filter(([, value]) => !!value))
        }, undefined, { shallow: true });
    };

    return (
        <motion.div
            variants={settingsUIStates}
            initial={"hidden"}
            animate={["visible", window.innerWidth < 720 ? "visibleSmall" : ""]}
            exit={"hidden"}
            className={"abs t0 r0 flex flex-col"}
            style={{ background: "#fff", mixBlendMode: window.innerWidth < 720 ? "exclusion" : "normal" }}
            layout
        >
            <Box className={"fw"} h={1} padding={`${window.innerWidth < 720 ? 0 : 82}px 7px 5px 7px`}/>
            <SettingsItem>
                <Box as={"p"} fontFamily={"Jetbrains Mono"} p={4}>{locale("language")}</Box>
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
            <SettingsItem overrideStyles={{ paddingTop: 0, paddingBottom: 8, paddingLeft: 0 }}>
                <Box paddingLeft={5}>{locale("settings.full-intro.title")}</Box>
                <Box paddingInline={4}>
                    <Checkbox
                        checked={fullIntro}
                        h={"25px"}
                        w={"26px"}
                        onChange={fullIntroSTChange}
                        bg={"#fff"}
                    />
                </Box>
                <Box
                    as={"i"}
                    className={"abs fw txt-algn-center"}
                    fontSize={"0.75rem"} top={"73%"}
                >
                    {locale("settings.full-intro.desc")}
                </Box>
            </SettingsItem>
            <Box className={"fw"} h={1} padding={"7px"}/>
        </motion.div>
    );
};

const SettingsIcon = () => {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300.112 300.112"
            width="1.5rem"
            height="1.5rem"
        >
			<path fill="#fff" d="M150.057,105.1c-24.789,0-44.955,20.167-44.955,44.955s20.166,44.955,44.955,44.955
				c24.789,0,44.955-20.167,44.955-44.955S174.845,105.1,150.057,105.1z M150.057,178.36c-15.607,0-28.305-12.697-28.305-28.305
				s12.697-28.305,28.305-28.305c15.608,0,28.305,12.697,28.305,28.305S165.663,178.36,150.057,178.36z"/>
            <path fill="#fff" d="M297.365,183.342l-25.458-22.983v-20.608l25.457-22.981c2.614-2.361,3.461-6.112,2.112-9.366l-13.605-32.846
				c-1.348-3.253-4.588-5.305-8.115-5.128l-34.252,1.749l-14.571-14.571l1.749-34.251c0.18-3.518-1.874-6.769-5.128-8.116
				L192.707,0.635c-3.253-1.35-7.005-0.501-9.365,2.111l-22.984,25.458h-20.606L116.77,2.746c-2.361-2.613-6.112-3.458-9.365-2.111
				L74.559,14.24c-3.255,1.348-5.308,4.599-5.128,8.116l1.75,34.251L56.609,71.178l-34.252-1.749
				c-3.506-0.188-6.768,1.874-8.115,5.128L0.635,107.403c-1.348,3.255-0.502,7.005,2.112,9.366l25.457,22.981v20.608L2.749,183.341
				c-2.614,2.361-3.461,6.112-2.112,9.366l13.605,32.846c1.348,3.255,4.603,5.321,8.115,5.128l34.252-1.749l14.572,14.571
				l-1.75,34.251c-0.18,3.518,1.874,6.769,5.128,8.116l32.846,13.606c3.255,1.352,7.005,0.502,9.365-2.111l22.984-25.458h20.606
				l22.984,25.458c1.613,1.785,3.873,2.746,6.182,2.746c1.071,0,2.152-0.208,3.183-0.634l32.846-13.606
				c3.255-1.348,5.308-4.599,5.128-8.116l-1.749-34.251l14.571-14.571l34.252,1.749c3.506,0.178,6.768-1.874,8.115-5.128
				l13.605-32.846C300.825,189.453,299.979,185.703,297.365,183.342z M272.737,213.754l-32.079-1.639
				c-2.351-0.127-4.646,0.764-6.311,2.428l-19.804,19.804c-1.666,1.666-2.547,3.958-2.428,6.311l1.638,32.079l-21.99,9.109
				l-21.525-23.843c-1.578-1.747-3.824-2.746-6.179-2.746h-28.006c-2.355,0-4.601,0.998-6.179,2.746l-21.525,23.843l-21.99-9.109
				l1.639-32.079c0.12-2.353-0.763-4.646-2.429-6.311l-19.803-19.804c-1.665-1.665-3.955-2.55-6.311-2.428l-32.079,1.639
				l-9.109-21.99l23.842-21.525c1.748-1.58,2.746-3.824,2.746-6.179v-28.008c0-2.355-0.998-4.601-2.746-6.179l-23.842-21.525
				l9.109-21.99l32.079,1.639c2.354,0.124,4.646-0.763,6.311-2.428l19.803-19.803c1.666-1.666,2.549-3.958,2.429-6.313
				l-1.639-32.079l21.99-9.109l21.525,23.842c1.578,1.747,3.824,2.746,6.179,2.746h28.006c2.355,0,4.601-0.998,6.179-2.746
				l21.525-23.842l21.99,9.109l-1.638,32.079c-0.12,2.353,0.761,4.645,2.428,6.313l19.804,19.803
				c1.666,1.665,3.959,2.564,6.311,2.428l32.079-1.639l9.109,21.99l-23.843,21.525c-1.748,1.58-2.746,3.824-2.746,6.179v28.008
				c0,2.355,0.998,4.601,2.746,6.179l23.843,21.525L272.737,213.754z"/>
            <path fill="#fff" d="M150.057,71.357c-43.394,0-78.698,35.305-78.698,78.698c0,43.394,35.304,78.698,78.698,78.698
				c43.394,0,78.698-35.305,78.698-78.698C228.754,106.661,193.45,71.357,150.057,71.357z M150.057,212.103
				c-34.214,0-62.048-27.834-62.048-62.048c0-34.214,27.834-62.048,62.048-62.048c34.214,0,62.048,27.834,62.048,62.048
				C212.105,184.269,184.269,212.103,150.057,212.103z"/>
        </motion.svg>
    );
};
