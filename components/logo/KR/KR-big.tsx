import { HasAnimation, joinClasses, joinModuleClasses, whichWider } from "@utils/common";
import {FC, useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import { AnimFunctions } from "@utils/anims";
const { Forceful } = AnimFunctions;
import styles from "./KR-big.module.scss";

const moduleClasses = joinModuleClasses(styles);

export const LogoLarge_KR: FC<HasAnimation> = ({dontAnimateChild}) => {
    const mode = useRef("fh");
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => {
        mode.current = whichWider() === "width" ? "fw" : "fh";
    }, []);
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: dontAnimateChild ? 0 : 20,
            }}
            transition={{
                duration: isExiting ? 0.5 : 0.3,
                ease: Forceful
            }}
            data-logo={""}
            data-noanim={dontAnimateChild}
            className={joinClasses(styles.logo, mode.current, "abs")}
            viewBox="-42 -30 152 148"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id={styles["arknights-kr"]}>
                <g className={joinClasses(styles["char-1"], "_0")}>
                    <mask id="logo-arknights-kr-chr1-t-l">
                        <path d="M1.79935 1.31039H5.16317V4.67421H1.79935V1.31039Z"/>
                    </mask>
                    <path className={styles["t-r"]} d="M7.68602 4.98958H7.16043V3.83327H5.47852V3.30767H7.16043V2.67695H5.47852V2.15136H7.16043V0.995041H7.68602V4.98958Z"/>
                    <path className={moduleClasses("t-l", "no-fill")} d="M1.79935 1.31039H5.16317V4.67421H1.79935V1.31039Z" strokeWidth="1" stroke="white" mask="url(#logo-arknights-kr-chr1-t-l)"/>
                    <path className={moduleClasses("b", "no-fill")} d="M7.42364 6.44946C7.42364 6.67121 7.24896 6.93598 6.82308 7.16124C6.40934 7.38007 5.8191 7.5236 5.15236 7.5236C4.48561 7.5236 3.89538 7.38007 3.48163 7.16124C3.05575 6.93598 2.88107 6.67121 2.88107 6.44946C2.88107 6.22771 3.05575 5.96294 3.48163 5.73768C3.89538 5.51884 4.48561 5.37532 5.15236 5.37532C5.8191 5.37532 6.40934 5.51884 6.82308 5.73768C7.24896 5.96294 7.42364 6.22771 7.42364 6.44946Z" stroke="white" strokeWidth="0.54"/>
                </g>
                <g className={joinClasses(styles["char-2"], "_1")}>
                    <path className={styles["b"]} d="M9.6833 7.72269V6.04078H13.783V5.72542H9.57819V5.19982H14.4137V6.67149H10.2089V7.09197H14.5188V7.72269H9.6833Z"/>
                    <path className={styles["t-r"]} d="M13.8881 0.995041H14.4137V4.88446H13.8881V0.995041Z"/>
                    <path className={moduleClasses("t-l", "no-fill")} d="M11.7591 2.9923C11.7591 3.76741 11.1094 4.40922 10.291 4.40922C9.47262 4.40922 8.82286 3.76741 8.82286 2.9923C8.82286 2.2172 9.47262 1.57539 10.291 1.57539C11.1094 1.57539 11.7591 2.2172 11.7591 2.9923Z" stroke="white" strokeWidth="0.53"/>
                </g>
                <g className={joinClasses(styles["char-3"], "_2")}>
                    <path className={styles["t-l"]} d="M17.7775 1.41553H18.3031V4.56911H15.3598V1.41553H15.8854V2.57184H17.7775V1.41553Z"/>
                    <path className={styles["t-l-inner"]} d="M15.8854 4.0435H17.7775V3.09742H15.8854V4.0435Z" data-inverse=""/>
                    <path className={styles["t-r"]} d="M21.3516 3.30767H20.1953V4.88446H19.6697V0.995041H20.1953V2.67695H21.3516V3.30767Z"/>
                    <path className={moduleClasses("b", "no-fill")} d="M20.0578 6.38505C20.0578 6.62232 19.896 6.88326 19.5358 7.09938C19.181 7.31227 18.6733 7.45269 18.0981 7.45269C17.5229 7.45269 17.0153 7.31227 16.6604 7.09938C16.3002 6.88326 16.1385 6.62232 16.1385 6.38505C16.1385 6.14779 16.3002 5.88684 16.6604 5.67072C17.0153 5.45784 17.5229 5.31741 18.0981 5.31741C18.6733 5.31741 19.181 5.45784 19.5358 5.67072C19.896 5.88684 20.0578 6.14779 20.0578 6.38505Z" stroke="white" strokeWidth="0.54"/>
                </g>
                <g className={joinClasses(styles["char-4"], "_3")}>
                    <path className={styles["b"]} d="M25.1359 7.72269H24.6103V5.19982H21.772V4.56911H27.9741V5.19982H25.1359V7.72269Z"/>
                    <path className={styles["t"]} d="M22.613 4.14863C22.5691 3.94329 22.4582 3.75838 22.2976 3.62303C22.8071 3.5606 23.2936 3.37476 23.7149 3.08166C24.1363 2.78856 24.4797 2.39705 24.7154 1.94112H22.4028V1.3104H27.4485V1.94112H25.3461L25.1359 2.15136C25.7351 2.92057 26.5951 3.44401 27.5536 3.62303L27.2383 4.14863C26.3538 3.92067 25.552 3.44687 24.9256 2.78207C24.311 3.46142 23.5045 3.93798 22.613 4.14863Z"/>
                </g>
            </g>
            <g id={styles["endfield-kr"]}>
                <g id={styles["movement-1"]}>
                    <path className={moduleClasses("char-1", "b")} d="M8.2116 33.0565H31.443L25.9768 38.7329H2.11467V35.5794L3.3761 29.3773H9.05256L8.2116 33.0565Z"/>
                    <path className={moduleClasses("char-2", "b")} d="M37.645 33.0565H61.7174V38.7329H32.1788L37.645 33.0565Z"/>
                    <g className={styles["group-1"]}>
                        <path className={moduleClasses("char-1", "t-r")} d="M29.3406 29.3773H23.6642L27.9741 9.19435H31.5481V18.7602L29.3406 29.3773Z"/>
                    </g>
                </g>
                <path className={moduleClasses("char-1", "t-l")} d="M14.8429 26.0375C13.4503 26.9973 11.795 27.5029 10.1038 27.4851C8.6091 27.4694 7.14718 27.0453 5.87607 26.2588C4.60497 25.4723 3.57305 24.3533 2.89188 23.0227C2.21072 21.6922 1.90623 20.2008 2.01134 18.7097C2.11645 17.2187 2.62716 15.7847 3.48825 14.5629C4.34934 13.3411 5.52804 12.3779 6.89691 11.7775C8.26578 11.1771 9.77274 10.9623 11.2549 11.1564C12.737 11.3504 14.1378 11.9459 15.306 12.8785C16.4741 13.8111 17.3651 15.0453 17.8826 16.4476H19.985L21.5618 9.19435H27.2383L22.9284 29.3773H17.2519L18.8287 22.124H17.8826C17.2973 23.7108 16.2355 25.0778 14.8429 26.0375Z"/>
                <path className={moduleClasses("char-1", "t-l-inner")} d="M11.9846 17.0299C11.4833 16.6949 10.8939 16.5161 10.291 16.5161C9.48248 16.5161 8.7071 16.8373 8.1354 17.409C7.5637 17.9807 7.24252 18.7561 7.24252 19.5646C7.24252 20.1675 7.42131 20.7569 7.75628 21.2582C8.09125 21.7595 8.56736 22.1503 9.12439 22.381C9.68142 22.6117 10.2944 22.6721 10.8857 22.5545C11.4771 22.4369 12.0202 22.1465 12.4466 21.7202C12.8729 21.2938 13.1633 20.7507 13.2809 20.1593C13.3985 19.568 13.3381 18.955 13.1074 18.398C12.8767 17.841 12.4859 17.3649 11.9846 17.0299Z" data-inverse=""/>
                <path className={moduleClasses("char-2", "t")} d="M38.9065 25.2776H60.5611L55.0949 30.9541H33.2301V9.19435H60.5611L55.0949 14.7657H38.9065V25.2776Z"/>
                <g className={styles["char-3"]}>
                    <g className={styles["t"]}>
                        <path className={styles["l"]} fillRule="evenodd" clipRule="evenodd" d="M21.6669 46.3015L22.7181 40.6251H0.958374V46.3015H4.3222L3.58636 49.6653H0.958374V55.2367H20.6157L21.6669 49.6653H17.9877L18.6184 46.3015H21.6669ZM12.3113 49.6653H9.15769L9.89353 46.3015H13.0471L12.3113 49.6653Z"/>
                        <path className={styles["r"]} d="M28.9201 55.2367H23.3488L26.3973 40.6251H30.4969V47.9835L28.9201 55.2367Z"/>
                    </g>
                    <path className={styles["b"]} d="M12.6266 61.8592H0.958374V56.7083H30.4969V61.8592L18.9338 65.1179H30.4969V70.1636H0.958374V65.1179L12.6266 61.8592Z"/>
                </g>
                <mask id="logo-endfield-kr-chr4">
                    <path d="M62.5584,70.1636h-29.328v-29.54h29.328v29.54z"></path>
                </mask>
                <g className={styles["char-4"]} mask="url(#logo-endfield-kr-chr4)">
                    <path className={styles["t"]} d="M60.5611 40.6251L55.0949 46.3015H38.9065V56.8135H60.5611L55.0949 62.4899H33.2301V40.6251H60.5611Z"/>
                    <path className={styles["b"]} d="M62.5584,70.1636h-29.328v-5.571h29.328v5.571z"/>
                    <g id={styles["en"]}>
                        <g className={joinClasses(styles["arknights"], "_1")}>
                            <path id={styles["a"]} d="M41.3513 65.2693H41.8196L42.4517 67.03H42.0116L41.9015 66.7549H41.2963L41.1863 67.03H40.7461L41.3513 65.2693Z" data-inverse=""/>
                            <path id={styles["a-inner"]} d="M41.3623 66.4798L41.5824 65.8195L41.83 66.4798H41.3623Z"/>
                            <path id={styles["r"]} d="M42.6168 65.2693H43.2771C43.7172 65.2693 43.9923 65.4894 43.9923 65.8745C43.9906 65.98 43.9585 66.0828 43.9 66.1706C43.8415 66.2584 43.7589 66.3275 43.6622 66.3697L44.0473 67.03H43.6072L43.2771 66.4798H43.057V67.03H42.6168V65.2693Z" data-inverse=""/>
                            <path id={styles["r-inner"]} d="M43.5522 65.8745C43.5522 65.8162 43.529 65.7602 43.4877 65.7189C43.4464 65.6776 43.3904 65.6544 43.3321 65.6544H43.057V66.0946H43.3321C43.3904 66.0946 43.4464 66.0714 43.4877 66.0302C43.529 65.9889 43.5522 65.9329 43.5522 65.8745V65.8745Z"/>
                            <path id={styles["k"]} d="M44.6801 66.4247V67.03H44.2399V65.2693H44.6801V65.9295L45.3403 65.2693H45.8905L45.1202 65.9846L45.8905 67.03H45.3953L44.8451 66.3147L44.6801 66.4247Z" data-inverse=""/>
                            <path id={styles["n"]} d="M46.0281 65.2693H46.4132L47.1835 66.2757V65.2693L47.6237 65.2693V67.03H47.2385L46.4683 65.9846V67.03H46.0281V65.2693Z" data-inverse=""/>
                            <path id={styles["i"]} d="M47.8437 65.2693H48.2839V67.03H47.8437V65.2693Z" data-inverse=""/>
                            <path id={styles["g"]} d="M48.46 66.1496C48.4519 66.0247 48.4705 65.8995 48.5147 65.7823C48.5588 65.6652 48.6274 65.5588 48.716 65.4703C48.8045 65.3818 48.9109 65.3131 49.028 65.269C49.1452 65.2249 49.2704 65.2062 49.3953 65.2143C49.5583 65.2116 49.7184 65.2571 49.8554 65.3452C49.9925 65.4334 50.1004 65.5601 50.1656 65.7095L49.7254 65.8195C49.6886 65.7666 49.6391 65.7237 49.5814 65.6949C49.5238 65.666 49.4598 65.6521 49.3953 65.6544C49.264 65.6544 49.138 65.7066 49.0452 65.7995C48.9523 65.8923 48.9001 66.0183 48.9001 66.1496C48.9001 66.281 48.9523 66.4069 49.0452 66.4998C49.138 66.5926 49.264 66.6448 49.3953 66.6448C49.6704 66.6448 49.8355 66.5348 49.8355 66.3697H49.3953V66.0396H50.2206V67.03H49.8355V66.9199C49.7805 67.03 49.5604 67.085 49.3953 67.085C49.2704 67.0931 49.1452 67.0744 49.028 67.0303C48.9109 66.9861 48.8045 66.9175 48.716 66.829C48.6274 66.7405 48.5588 66.6341 48.5147 66.5169C48.4705 66.3998 48.4519 66.2746 48.46 66.1496" data-inverse=""/>
                            <path id={styles["h"]} d="M51.5301 65.9295V65.2693H51.9702V67.03H51.5301V66.3697H50.8698V67.03H50.4297V65.2693H50.8698V65.9295H51.5301Z" data-inverse=""/>
                            <path id={styles["t"]} d="M53.0156 67.03H52.6305V65.6544H52.0803V65.2693H53.5658V65.6544H53.0156V67.03Z" data-inverse=""/>
                            <path id={styles["s"]} d="M54.072 66.2597C53.962 66.2157 53.8485 66.1751 53.7691 66.0858C53.6896 65.9964 53.6415 65.8836 53.6319 65.7645C53.6388 65.6849 53.6614 65.6075 53.6984 65.5366C53.7353 65.4658 53.786 65.403 53.8474 65.3519C53.9087 65.3007 53.9797 65.2622 54.056 65.2386C54.1323 65.215 54.2126 65.2067 54.2921 65.2143C54.442 65.2096 54.5891 65.256 54.7091 65.346C54.8291 65.436 54.9149 65.5642 54.9524 65.7095L54.5672 65.8195C54.5607 65.783 54.5468 65.7483 54.5265 65.7173C54.5062 65.6863 54.4799 65.6597 54.449 65.6392C54.4182 65.6186 54.3835 65.6045 54.3471 65.5977C54.3107 65.5908 54.2698 65.5731 54.2336 65.5811C54.1236 65.5811 54.072 65.6545 54.072 65.7095C54.072 65.7645 54.2371 65.8745 54.4572 65.9846C54.6772 66.0946 55.0074 66.2047 55.0074 66.5348C55.0074 66.8649 54.7323 67.085 54.2921 67.085C54.1208 67.0921 53.952 67.0418 53.8125 66.9422C53.6729 66.8425 53.5707 66.6991 53.5218 66.5348L53.962 66.4247C54.017 66.5348 54.127 66.6998 54.2921 66.6998C54.4572 66.6998 54.5122 66.6448 54.5122 66.5348C54.5122 66.4247 54.3471 66.3697 54.072 66.2597Z" data-inverse=""/>
                        </g>
                        <g className={joinClasses(styles["endfield"], "_0")}>
                            <path id={styles["e-1"]} d="M42.3334 69.543H40.7516V67.4703H42.3334V67.9066H41.297V68.2885H42.0607V68.7248H41.297V69.1066H42.3334V69.543Z" data-inverse=""/>
                            <path id={styles["n"]} d="M44.5151 69.543H44.0242L43.1515 68.2867V69.543H42.6061V67.4703H43.097L44.0242 68.6703V67.4703H44.5151V69.543Z" data-inverse=""/>
                            <path id={styles["d-1"]} d="M47.7333 69.543H44.8424V67.4702H45.7697C45.9103 67.4628 46.051 67.4842 46.1831 67.5329C46.3152 67.5817 46.436 67.6568 46.538 67.7538C46.6401 67.8508 46.7214 67.9676 46.7768 68.097C46.8323 68.2264 46.8608 68.3658 46.8606 68.5066C46.8608 68.6474 46.8323 68.7868 46.7768 68.9162C46.7214 69.0456 46.6401 69.1624 46.538 69.2594C46.436 69.3564 46.3152 69.4315 46.1831 69.4803C46.051 69.529 45.9103 69.5504 45.7697 69.543" data-inverse=""/>
                            <path id={styles["d-1-inner"]} d="M45.7697 67.9066H45.3333V69.1066H45.7697C45.8461 69.107 45.9218 69.0913 45.9918 69.0605C46.0618 69.0298 46.1246 68.9847 46.176 68.9281C46.2274 68.8715 46.2664 68.8047 46.2904 68.7321C46.3143 68.6595 46.3228 68.5827 46.3151 68.5066C46.3157 68.3565 46.2601 68.2116 46.1591 68.1005C46.0581 67.9895 45.9192 67.9203 45.7697 67.9066"/>
                            <path id={styles["f"]} d="M48.4424 67.9066H47.5151V68.343H48.2787V68.7794H47.5151V69.543H47.0242V67.4703H48.4969L48.4424 67.9066Z" data-inverse=""/>
                            <path id={styles["i"]} d="M49.2333 69.543H48.7424V67.4703H49.2333V69.543Z" data-inverse=""/>
                            <path id={styles["e-2"]} d="M51.0606 69.543H49.5333V67.4703H51.0606V67.9066H50.0242V68.2885H50.8424V68.7248H50.0242V69.1066H51.0606V69.543Z" data-inverse=""/>
                            <path id={styles["l"]} d="M52.8606 69.543H51.3878V67.4703H51.8788V69.1066H52.8606V69.543Z" data-inverse=""/>
                            <path id={styles["d-2"]} d="M53.9515 69.543H53.0242V67.4702H53.9515C54.0921 67.4628 54.2327 67.4842 54.3648 67.5329C54.4969 67.5817 54.6177 67.6568 54.7198 67.7538C54.8219 67.8508 54.9031 67.9676 54.9586 68.097C55.0141 68.2264 55.0426 68.3658 55.0424 68.5066C55.0426 68.6474 55.0141 68.7868 54.9586 68.9162C54.9031 69.0456 54.8219 69.1624 54.7198 69.2594C54.6177 69.3564 54.4969 69.4315 54.3648 69.4803C54.2327 69.529 54.0921 69.5504 53.9515 69.543Z" data-inverse=""/>
                            <path id={styles["d-2-inner"]} d="M53.9514 67.9066H53.5151V69.1066H53.9514C54.0279 69.107 54.1036 69.0913 54.1736 69.0605C54.2436 69.0298 54.3063 68.9847 54.3578 68.9281C54.4092 68.8715 54.4482 68.8047 54.4721 68.7321C54.4961 68.6595 54.5045 68.5827 54.4969 68.5066C54.4975 68.3565 54.4418 68.2116 54.3408 68.1005C54.2399 67.9895 54.1009 67.9203 53.9514 67.9066"/>
                        </g>
                    </g>
                </g>
            </g>
        </motion.svg>
    );
};