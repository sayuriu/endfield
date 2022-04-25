import {FC} from "react";
import {Box} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {AnimFunctions} from "@utils/anims";
import {HypergryphLogo} from "@components/logo/Hypergryph/Hypergryph";
import {MountainContourLogo} from "@components/logo/MountainContour/MountainContour";

import terrainStyles from "./terrain.module.scss";
import {joinClasses} from "@utils/common";

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
                <Box w={340} className={"fh flex"} paddingLeft={50} zIndex={1}>
                    <HypergryphLogo
                        woke={true}
                        dontAnimateChild={true}
                        overrideStyles={{width: "55%"}}
                        {...LogoAnimConfig(.1)}
                    />
                    <MountainContourLogo
                        dontAnimateChild={true}
                        overrideStyles={{width: "45%"}}
                        {...LogoAnimConfig(.3)}
                    />
                </Box>
                <Box as="p" p={4} fontFamily={"JetBrains Mono"} textAlign="right" zIndex={1}>
                    This project is fan-made and does not represent the&nbsp;
                    <a href="https://endfield.hypergryph.global" target="_blank" rel="noreferrer">official website.</a>
                    <br/>
                    <a href="https://endfield.hypergryph.global" target="_blank" rel="noreferrer">To official site</a>&thinsp;|&thinsp;
                    <a href="https://endfield.hypergryph.com" target="_blank" rel="noreferrer">CN ver</a>
                    <br/>
                    <a href="#" target="_blank" rel="noreferrer">@sayuriu</a>
                    &thinsp;&bull;&thinsp;
                    <a href="#" target="_blank" rel="noreferrer">View source</a>
                </Box>
            </Box>
        </motion.div>
    );
};

const TerrainMap = () => {
    return(
        <motion.div
            style={{
                width: "50%",
            }}
            className={"fh abs grid t0 l0 overflow-hidden z0"}
        >
            <svg viewBox="1 60 485 1140.294" width="700" opacity={.5}>
                <path id={terrainStyles["_1"]} className={terrainStyles["terrain"]}
                      d="M 86.906 30.166 C 118.961 53.292 152.599 98.813 185.04 117.477 C 218.422 136.729 253.241 135.607 286.676 117.044 C 310.148 104.02 332.939 82.548 356.476 70.568 C 400.213 48.558 445.318 59.727 486.901 102.866 L 486.901 0 L -0.076 0 L -0.076 26.868 C 27.442 1.199 58.479 9.648 86.906 30.166 Z"/>
                <path id={terrainStyles["_2"]} className={terrainStyles["terrain"]}
                      d="M 86.906 26.694 C 118.961 47.159 152.599 87.441 185.04 103.957 C 218.422 120.993 253.241 120.002 286.676 103.573 C 310.148 92.049 332.939 73.048 356.476 62.447 C 400.213 42.97 445.318 52.853 486.901 91.028 L 486.901 0 L -0.076 0 L -0.076 23.776 C 27.442 1.061 58.479 8.537 86.906 26.694 Z"/>
                <path id={terrainStyles["_3"]} className={terrainStyles["terrain"]}
                      d="M 86.906 23.164 C 118.961 40.922 152.599 75.875 185.04 90.206 C 218.422 104.989 253.241 104.128 286.676 89.874 C 310.148 79.874 332.939 63.386 356.476 54.187 C 400.213 37.287 445.318 45.863 486.901 78.987 L 486.901 0.001 L -0.076 0.001 L -0.076 20.632 C 27.442 0.922 58.479 7.409 86.906 23.164 Z"/>
                <path id={terrainStyles["_4"]} className={terrainStyles["terrain"]}
                      d="M 86.906 20.585 C 118.961 36.366 152.599 67.427 185.04 80.163 C 218.422 93.299 253.241 92.534 286.676 79.867 C 310.148 70.981 332.939 56.329 356.476 48.155 C 400.213 33.135 445.318 40.756 486.901 70.193 L 486.901 0 L -0.076 0 L -0.076 18.335 C 27.442 0.819 58.479 6.584 86.906 20.585 Z"/>
                <path id={terrainStyles["_5"]} className={terrainStyles["terrain"]}
                      d="M 86.897 17.574 C 118.984 31.046 152.685 57.563 185.152 68.435 C 218.561 79.65 253.378 78.997 286.787 68.183 C 310.242 60.597 333.002 48.088 356.523 41.11 C 400.23 28.288 445.35 34.794 486.992 59.923 L 486.85 0 L -0.127 0 L -0.09 15.653 C 27.393 0.7 58.441 5.621 86.897 17.574 Z"/>
                <path id={terrainStyles["_6"]} className={terrainStyles["terrain"]}
                      d="M 87.024 11.423 C 119.111 20.18 152.812 37.417 185.279 44.484 C 218.688 51.774 253.505 51.35 286.914 44.32 C 310.369 39.389 333.129 31.258 356.65 26.722 C 400.357 18.388 445.477 22.617 487.119 38.951 L 486.977 0 L 0 0 L 0.037 10.175 C 27.52 0.455 58.568 3.654 87.024 11.423 Z"/>
                <path id={terrainStyles["_7"]} className={terrainStyles["terrain"]}
                      d="M 87.024 5.586 C 119.111 9.869 152.812 18.299 185.279 21.756 C 218.688 25.322 253.505 25.114 286.914 21.676 C 310.369 19.264 333.129 15.287 356.65 13.069 C 400.357 8.992 445.477 11.061 487.119 19.05 L 486.977 -0.001 L 0 -0.001 L 0.037 4.975 C 27.52 0.221 58.568 1.786 87.024 5.586 Z"/>
                <path id={terrainStyles["_8"]} className={terrainStyles["terrain"]}
                      d="M 86.982 49.517 C 119.037 87.479 152.675 162.202 185.116 192.839 C 218.498 224.441 253.317 222.6 286.752 192.128 C 310.224 170.749 333.015 135.503 356.552 115.838 C 400.289 79.708 445.394 98.042 486.977 168.855 L 486.977 0 L 0 0 L 0 44.104 C 27.518 1.968 58.555 15.837 86.982 49.517 Z"/>
                <path id={terrainStyles["_9"]} className={terrainStyles["terrain"]}
                      d="M 86.982 68.691 C 119.037 121.353 152.675 225.01 185.116 267.51 C 218.498 311.349 253.317 308.795 286.752 266.524 C 310.224 236.867 333.015 187.973 356.552 160.693 C 400.289 110.573 445.394 136.006 486.977 234.239 L 486.977 0 L 0 0 L 0 61.182 C 27.518 2.73 58.555 21.97 86.982 68.691 Z"/>
                <path id={terrainStyles["_10"]} className={terrainStyles["terrain"]}
                      d="M 86.982 74.546 C 119.037 131.696 152.675 244.188 185.116 290.311 C 218.498 337.886 253.317 335.114 286.752 289.241 C 310.224 257.056 333.015 203.995 356.552 174.389 C 400.289 119.998 445.394 147.598 486.977 254.204 L 486.977 0 L 0 0 L 0 66.397 C 27.518 2.963 58.555 23.843 86.982 74.546 Z"/>
                <path id={terrainStyles["_11"]} className={terrainStyles["terrain"]}
                      d="M 86.982 86.109 C 119.037 152.124 152.675 282.065 185.116 335.342 C 218.498 390.297 253.317 387.095 286.752 334.106 C 310.224 296.929 333.015 235.637 356.552 201.439 C 400.289 138.611 445.394 170.493 486.977 293.634 L 486.977 0 L 0 0 L 0 76.696 C 27.518 3.423 58.555 27.542 86.982 86.109 Z"/>
                <path id={terrainStyles["_12"]} className={terrainStyles["terrain"]}
                      d="M 86.982 34.002 C 119.037 60.07 152.675 111.38 185.116 132.418 C 218.498 154.119 253.317 152.854 286.752 131.93 C 310.224 117.25 333.015 93.047 356.552 79.543 C 400.289 54.734 445.394 67.323 486.977 115.949 L 486.977 0 L 0 0 L 0 30.285 C 27.518 1.352 58.555 10.876 86.982 34.002 Z"/>
                <path id={terrainStyles["_13"]} className={terrainStyles["terrain"]}
                      d="M 86.982 92.402 C 119.037 163.243 152.675 302.68 185.116 359.852 C 218.498 418.825 253.317 415.387 286.752 358.525 C 310.224 318.632 333.015 252.859 356.552 216.161 C 400.289 148.742 445.394 182.953 486.977 315.096 L 486.977 0 L 0 0 L 0 82.301 C 27.518 3.674 58.555 29.556 86.982 92.402 Z"/>
                <path id={terrainStyles["_14"]} className={terrainStyles["terrain"]}
                      d="M 86.982 121.614 C 119.037 214.85 152.675 398.368 185.116 473.615 C 218.498 551.231 253.317 546.706 286.752 471.868 C 310.224 419.363 333.015 332.797 356.552 284.497 C 400.289 195.765 445.394 240.791 486.977 414.709 L 486.977 0 L 0 0 L 0 108.319 C 27.518 4.835 58.555 38.9 86.982 121.614 Z"/>
                <path id={terrainStyles["_15"]} className={terrainStyles["terrain"]}
                      d="M 86.982 170.847 C 119.037 301.828 152.675 559.639 185.116 665.349 C 218.498 774.386 253.317 768.029 286.752 662.894 C 310.224 589.134 333.015 467.523 356.552 399.67 C 400.289 275.017 445.394 338.271 486.977 582.596 L 486.977 0 L 0 0 L 0 152.17 C 27.518 6.792 58.555 54.648 86.982 170.847 Z"/>
                <path id={terrainStyles["_16"]} className={terrainStyles["terrain"]}
                      d="M 86.982 234.796 C 119.037 414.804 152.675 769.115 185.116 914.393 C 218.498 1064.244 253.317 1055.507 286.752 911.02 C 310.224 809.651 333.015 642.52 356.552 549.269 C 400.289 377.958 445.394 464.888 486.977 800.665 L 486.977 0 L 0 0 L 0 209.128 C 27.518 9.334 58.555 75.103 86.982 234.796 Z"/>
                <path id={terrainStyles["_17"]} className={terrainStyles["terrain"]}
                      d="M 86.982 261.684 C 125.136 508.127 152.675 857.191 185.116 1019.105 C 218.498 1186.116 253.317 1176.379 286.752 1015.346 C 310.224 902.368 333.015 716.098 356.552 612.169 C 400.289 421.24 445.394 518.125 486.977 892.353 L 486.977 0 L 0 0 L 0 233.1 C 27.518 10.403 82.312 231.521 86.982 261.684 Z"/>
            </svg>
            <Box
                className={joinClasses(terrainStyles["cover"], "fh")}
                w={160}
                transform={"translateX(-92px)"}
                bgImage={"linear-gradient(-90deg, hsl(0, 0%, 0%) 75% 50%, transparent 100% 50%)"}
                gridColumnStart={2}
                gridRowStart={1}
            />
        </motion.div>
    );
};
