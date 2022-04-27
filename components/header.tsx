import {FC, useState} from "react";
import {Box} from "@chakra-ui/react";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import {AnimFunctions} from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import {LogoSmall_CN} from "@components/logo/CN/CN-small";
import {Nullable} from "@utils/common";
import {LogoSmall_EN} from "@components/logo/EN/EN-small";
import {useRouter} from "next/router";

interface HeaderProps {
    lang: Nullable<string>;
}

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

export const Header: FC<HeaderProps> = ({ lang }) => {
    const router = useRouter();
    const [logoOpacity, setLogoOpacity] = useState(1);
    return (
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
                <Box {...resolveConfig(lang)}>
                    <AnimatePresence>
                        {lang === 'cn' && <LogoSmall_CN opacity={logoOpacity} key={"logo-endfield-cn-smol"}/>}
                        {lang === 'en' && <LogoSmall_EN opacity={logoOpacity} key={"logo-endfield-cn-smol"}/>}
                    </AnimatePresence>
                </Box>
                <div/>
                <Settings
                    onLangChange={(newLang) => {
                        setLogoOpacity(0);
                        setTimeout(async () => {
                            await router.push({href: '/', query: {lang: newLang}});
                            setLogoOpacity(1);
                        }, 450);
                    }}/>
            </Box>
        </motion.div>
    );
};

const Settings: FC<{ onLangChange: (lang: string) => void }> = ({ onLangChange }) => {
    const lang = ["cn", "en"];
    const router = useRouter();
    const [langOptionVisible, setLangOptionVisible] = useState(false);
    const variants = {
        visible: {
            opacity: 1,
        },
        hidden: {
            opacity: 0,
        },
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
    return (
        <Box fontFamily={"Jetbrains Mono"} p={4} className={"rel"}>
            <motion.button
                onClick={() => setLangOptionVisible(!langOptionVisible)}
                variants={variants}
                initial={"langBtn"}
                whileHover={"langBtnHover"}
            >
                <p>LANGUAGE</p>
            </motion.button>
            <motion.div
                initial={"hidden"}
                animate={langOptionVisible ? "visible" : "hidden"}
                transition={{ duration: 0.5, ease: Forceful }}
                variants={variants}
                className={"abs l0 tfull flex flex-col"}
            >
                {lang.map((_lang, i) => (
                    <motion.button
                        variants={variants}
                        initial={"hidden"}
                        animate={"langBtn"}
                        key={i}
                        className={_lang === router.query.lang ? "no-pointer" : ""}
                        onClick={() => onLangChange(_lang)}
                    >
                        {_lang === router.query.lang ?
                            <s>{_lang}</s> :
                            _lang
                        }
                    </motion.button>
                ))}
            </motion.div>
        </Box>
    );
};
