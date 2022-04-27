import {FC} from "react";
import {Box} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {AnimFunctions} from "@utils/anims";
import {joinClasses} from "@utils/common";
import {HypergryphLogo} from "@components/logo/Hypergryph/Hypergryph";
import {MountainContourLogo} from "@components/logo/MountainContour/MountainContour";
import {Anchor} from "@components/anchor";

import terrainStyles from "./terrain.module.scss";
const {Forceful, SlowDown} = AnimFunctions;

export const Footer:  FC = () => {
    const LogoAnimConfig = (delay = 0) => ({
        initial: {
            y: 50,
        },
        animate: {
            y: 0,
        },
        transition: {
            duration: .8,
            ease: SlowDown,
            delay,
        }
    });
    return (
        <motion.div
            className={"abs l0"}
            initial={{ bottom: -90 }}
            animate={{ bottom: 0 }}
            transition={{ duration: 0.5, ease: Forceful }}
        >
            <Box
                h={"88px"}
                w={"100vw"}
                bg={"#000"}
                borderTop={"1px solid #fff"}
                className={"rel flex a-flex-center j-flex-space-between"}
            >
                <TerrainMap />
                <Box w={350} className={"fh flex"} paddingLeft={(70 / 1920 * 100) + "%"} zIndex={2}>
                    <HypergryphLogo
                        woke
                        link
                        dontAnimateChild
                        overrideStyles={{width: "55%"}}
                        {...LogoAnimConfig(.1)}
                    />
                    <MountainContourLogo
                        dontAnimateChild
                        overrideStyles={{width: "45%"}}
                        {...LogoAnimConfig(.3)}
                    />
                </Box>
                <Box
                    as="p"
                    p={4}
                    color={"hsl(213, 0%, 70%)"}
                    fontFamily={"JetBrains Mono"}
                    textAlign="right"
                    zIndex={1}
                    whiteSpace="nowrap"
                    maxWidth={"70%"}
                    isTruncated
                >
                    This project is fan-made and does not represent the official website.
                    <br/>
                    <Anchor to="https://endfield.hypergryph.global">To official site</Anchor>&thinsp;|&thinsp;
                    <Anchor to="https://endfield.hypergryph.com">CN ver</Anchor>
                    <br/>
                    <Anchor to="https://github.com/sayuriu">@sayuriu</Anchor>
                    &thinsp;&bull;&thinsp;
                    <Anchor to="https://github.com/sayuriu/endfield">View source</Anchor>
                </Box>
            </Box>
        </motion.div>
    );
};

const TerrainMap = () => {
    return(
        <motion.div
            style={{
                width: "700px",
            }}
            className={"fh abs t0 l0 overflow-hidden z0"}
        >
            <svg className={terrainStyles["terrain-view"]} viewBox="1 30 485 1140.294" width="700" opacity={.5}>
                <defs>
                    <linearGradient id={"footer__terrain-cover"}>
                        <stop offset={"0%"} stopColor={"#00000000"}/>
                        <stop offset={"98%"} stopColor={"#000"}/>
                    </linearGradient>
                </defs>
                <path id={terrainStyles["_b2"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_b1"]} className={joinClasses(terrainStyles["terrain"], terrainStyles["highlight"])}/>
                <path id={terrainStyles["_1"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_2"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_3"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_4"]} className={joinClasses(terrainStyles["terrain"], terrainStyles["highlight"])}/>
                <path id={terrainStyles["_5"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_6"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_7"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_8"]} className={joinClasses(terrainStyles["terrain"], terrainStyles["highlight"])}/>
                <path id={terrainStyles["_9"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_10"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_11"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_12"]} className={joinClasses(terrainStyles["terrain"], terrainStyles["highlight"])}/>
                <path id={terrainStyles["_13"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_14"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_15"]} className={terrainStyles["terrain"]}/>
                <path id={terrainStyles["_16"]} className={joinClasses(terrainStyles["terrain"], terrainStyles["highlight"])}/>
                <path id={terrainStyles["_17"]} className={terrainStyles["terrain"]}/>
                <rect x={0} y={0} width={500} height={1140.294} fill={"url(#footer__terrain-cover)"}/>
            </svg>
        </motion.div>
    );
};
