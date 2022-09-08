import { FC, useEffect, useRef, useState } from "react";
import { HasAnimation, joinClasses, whichWider } from "@utils/common";
import { motion } from "framer-motion";

import styles from "./JP-big.module.scss";
import { AnimFunctions } from "@utils/anims";
const { Forceful } = AnimFunctions;

export const LogoLarge_JP: FC<HasAnimation> = ({ dontAnimateChild = null}) => {
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
            viewBox="0 0 69 77"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath id={"cn-square__hide"}>
                    <rect x="45.7979" y="54.0741" width="22.7" height="22.7"/>
                </clipPath>
            </defs>
            <path className={joinClasses("_1", styles["arknights"], styles["chr1"])} d="M0.897949 5.77411L1.79795 6.57411C2.36939 6.18332 2.84745 5.67112 3.19795 5.07411C3.54251 4.14668 3.71204 3.16338 3.69795 2.17411H5.09795L3.69795 3.47411L4.59795 4.27411L6.79795 1.77411L6.09795 1.17411H1.09795V2.17411H2.69795C2.70358 2.71402 2.6363 3.25221 2.49795 3.77411C2.38914 4.20223 2.1901 4.60215 1.91416 4.94708C1.63821 5.29201 1.29174 5.57399 0.897949 5.77411"/>
            <path className={joinClasses("_2", styles["arknights"], styles["chr2"])} d="M5.89795 4.17411H11.3979V3.17411H5.89795V4.17411Z"/>
            <path className={joinClasses("_3", styles["arknights"], styles["chr3"])} d="M13.6979 2.77409H15.3979C14.9979 4.87409 12.1979 5.67409 12.1979 5.67409L12.8979 6.67409C13.7984 6.35644 14.6178 5.8443 15.2979 5.17409C16.016 4.35028 16.4995 3.34871 16.6979 2.27409L16.0979 1.67409H14.2979L14.5979 1.17409L13.5979 0.77409C13.2057 1.82096 12.5092 2.72648 11.5979 3.37409L12.2979 4.17409C12.8427 3.79267 13.3165 3.31885 13.6979 2.77409Z"/>
            <path className={joinClasses("_4", styles["arknights"], styles["chr4"])} d="M18.7979 4.87408C18.4425 5.31937 17.9506 5.63558 17.3979 5.77408L18.0979 6.67408C18.7353 6.4882 19.2962 6.10262 19.6979 5.57408C20.1286 4.9645 20.3077 4.21234 20.1979 3.47408H22.2979V2.47408H20.1979V1.07408H19.1979V2.47408H16.9979V3.47408H19.1979C19.1858 3.96717 19.0482 4.44902 18.7979 4.87408Z"/>
            <path className={joinClasses("_5", styles["arknights"], styles["chr5"])} d="M22.418 4.95407C23.0585 4.69966 23.6635 4.36355 24.218 3.95407V6.47407H25.218V3.17407C25.8241 2.72554 26.3571 2.1858 26.798 1.57407L25.998 0.874065C24.9005 2.26454 23.4501 3.33509 21.798 3.97407L22.398 4.97407"/>
            <path className={joinClasses("_6", styles["arknights"], styles["chr6-stroke-short-1"])} d="M27.7979 4.1741L28.7979 3.7741C28.7702 2.92698 28.4525 2.11506 27.8979 1.4741L26.8979 1.8741C27.4312 2.44933 27.7492 3.19124 27.7979 3.9741"/>
            <path className={joinClasses("_6", styles["arknights"], styles["chr6-stroke-short-2"])} d="M29.198 3.4741L30.198 3.0741C30.127 2.29669 29.812 1.56163 29.298 0.974102L28.298 1.2741C28.5853 1.56357 28.8127 1.9069 28.9672 2.28441C29.1216 2.66193 29.2 3.06622 29.198 3.4741Z"/>
            <path className={joinClasses("_6", styles["arknights"], styles["chr6-stroke-long"])} d="M27.698 5.77408L28.398 6.67408C30.8328 5.47126 32.1517 3.68897 32.098 1.67408L30.998 1.07408C31.1824 1.90798 31.0091 2.7527 30.4905 3.54789C29.9719 4.34307 29.1208 5.06909 27.998 5.67408"/>
            <path className={joinClasses("_1", styles["endfield"], styles["chr1_1"])} d="M23.5979 26.0741H14.4979V12.4741H19.7979L23.5979 7.97411H0.897949V12.4741H9.99795V26.0741H0.897949V30.5741H23.5979V26.0741Z"/>
            <path className={joinClasses("_2", styles["endfield"], styles["chr1_2-stroke-long"])} d="M47.4979 22.2741V7.87407H43.0979V20.5741L24.8979 26.0741V30.5741L47.4979 23.7741V22.2741Z"/>
            <path className={joinClasses("_2", styles["endfield"], styles["chr1_2-stroke-short"])} d="M26.698 13.6741L38.898 17.5741V13.0741L32.798 11.0741L26.698 9.17412V13.6741Z"/>
            <path className={joinClasses("_3", styles["endfield"], styles["chr1_3-main"])} d="M53.3979 19.2741L66.8979 23.4741V19.2741L53.298 14.9741V7.87407H48.798V30.5741H53.298L53.3979 19.2741Z"/>
            <path className={joinClasses("_3", styles["endfield"], styles["chr1_3-dot-1"])} d="M60.7979 7.97411H56.0979V12.4741H60.7979V7.97411Z"/>
            <path className={joinClasses("_3", styles["endfield"], styles["chr1_3-dot-2"])} d="M66.7979 7.97411H62.0979V12.4741H66.7979V7.97411Z"/>
            <path className={joinClasses("_4", styles["endfield"], styles["chr2_1"])} d="M0.897949 31.7741H0.997949V36.2741H16.9979C15.5979 40.3741 11.8979 46.0741 2.59795 47.8741V53.3741C3.71964 53.3209 4.82931 53.1191 5.89795 52.7741C10.9979 51.3741 19.9979 46.7741 23.5979 31.8741L0.897949 31.7741Z"/>
            <path className={joinClasses("_5", styles["endfield"], styles["chr2_2"])} d="M41.5979 30.9741L26.3979 35.5741V40.4741L32.1979 38.6741V49.3741H36.4979V37.3741L41.5979 35.7741V30.9741Z"/>
            <path className={joinClasses("_6", styles["endfield"], styles["chr2_3"])} d="M68.4979 39.8741H44.0979V44.3741H64.6979L68.4979 39.8741Z"/>
            <path className={joinClasses("_7", styles["endfield"], styles["chr3_1-l"])} d="M6.99795 65.9741C6.99795 71.1741 1.59795 71.3741 1.59795 71.3741V76.5741C11.6979 75.0741 11.5979 67.4741 11.5979 67.4741V53.9741H6.99795V65.9741Z"/>
            <path className={joinClasses("_7", styles["endfield"], styles["chr3_1-r"])} d="M17.8979 70.9741V53.9741H13.3979V76.6741C21.4979 75.5741 23.8979 70.9741 23.8979 70.9741V65.7741C22.2778 67.9025 20.2351 69.6729 17.8979 70.9741Z"/>
            <path className={joinClasses("_8", styles["endfield"], styles["chr3_2-main"])} d="M29.998 53.9741H25.298V76.6741H29.798V65.5741L43.398 70.0741V65.5741L29.998 61.2741V53.9741Z"/>
            <path className={joinClasses("_8", styles["endfield"], styles["chr3_2-dot-1"])} d="M32.698 58.5741H37.398V54.0741H32.698V58.5741Z"/>
            <path className={joinClasses("_8", styles["endfield"], styles["chr3_2-dot-2"])} d="M38.798 58.5741H43.4979V54.0741H38.798V58.5741Z"/>
            <g clipPath={"url(#cn-square__hide)"}>
                <g id={styles["ak-cn"]}>
                    <rect className={joinClasses(styles["square"], "_1")}  x="45.7979" y="54.0741" width="22.7" height="22.7"/>
                    <path className={joinClasses(styles["arknights-cn"], styles["char-1-1"])}  d="M46.7401 68.5618H47.0953V67.5909H46.527V68.7039H46.7401V68.5618ZM46.7401 67.7804H46.8822V67.9698H46.7401V67.7804ZM46.7401 68.1593H46.8822V68.3487H46.7401V68.1593Z" data-inverse={""}/>
                    <path className={joinClasses(styles["arknights-cn"], styles["char-1-2"])}  d="M46.9533 68.8697L47.1427 69.0118C47.279 68.8771 47.3701 68.7033 47.4032 68.5145H47.6874V68.7513H47.4506C47.485 68.8266 47.5089 68.9063 47.5216 68.9881L47.8294 68.9407C47.9005 68.8934 47.9242 68.846 47.9242 68.7276V67.5673H47.2137V68.1356C47.2281 68.2697 47.2121 68.4052 47.167 68.5323C47.122 68.6594 47.0489 68.7747 46.9533 68.8697ZM47.4269 67.7804H47.6874V67.9225H47.4269V67.7804ZM47.4269 68.1356H47.6874V68.3014H47.4269V68.1356Z" data-inverse={""}/>
                    <path className={joinClasses(styles["arknights-cn"], styles["char-2"])}  d="M48.3031 68.8697H48.9661V68.9881H49.2029V67.5909H48.0663V68.9881H48.3031V68.8697ZM48.3031 67.8277H48.9661V68.1119H48.3031V67.8277ZM48.3031 68.3487H48.9661V68.6566H48.3031V68.3487Z" data-inverse={""}/>
                    <path className={joinClasses(styles["arknights-cn"], styles["char-3"])}  d="M49.3214 68.8223C49.3886 68.8739 49.445 68.9383 49.4871 69.0118C49.6082 68.9435 49.7119 68.8481 49.79 68.7331C49.868 68.6181 49.9184 68.4865 49.937 68.3487H50.4107C50.387 68.5855 50.3633 68.7276 50.3159 68.7513H49.9607C50.0124 68.8207 50.045 68.9023 50.0555 68.9881H50.3159C50.3956 68.9814 50.4707 68.948 50.5291 68.8934C50.6142 68.683 50.6545 68.4572 50.6475 68.2303V68.1356H49.9607C49.9784 68.0822 49.9864 68.0261 49.9844 67.9698H50.7896V67.733H50.1502L50.2449 67.6857L50.1265 67.4725L49.9134 67.5673L49.9844 67.733H49.345V67.9698H49.7239C49.7451 68.1355 49.7184 68.3038 49.6471 68.4548C49.5757 68.6059 49.4627 68.7334 49.3214 68.8223Z" data-inverse={""}/>
                    <path className={joinClasses(styles["arknights-cn"], styles["char-4"])}  d="M50.7659 68.3961H50.9553C50.9502 68.4836 50.9264 68.569 50.8855 68.6466C50.8447 68.7242 50.7877 68.7922 50.7185 68.846C50.7961 68.8821 50.8619 68.9396 50.908 69.0118C51.0773 68.85 51.1789 68.6299 51.1921 68.3961H51.7841V68.7513H51.5947C51.6148 68.8235 51.6385 68.8946 51.6657 68.9644H51.9262C51.9973 68.917 52.0209 68.8697 52.0209 68.7513V68.3961H52.2104V68.1829H52.0209V67.6856H51.5473C51.5877 67.6359 51.6197 67.5799 51.6421 67.5199H51.3579C51.3506 67.5849 51.3347 67.6486 51.3105 67.7093H50.979V68.1829H50.7659V68.3961ZM51.7841 67.8751V68.1829H51.5473L51.6657 68.0645L51.4526 67.8751H51.7841ZM51.2158 68.1119V67.8751H51.4289L51.2868 67.9935L51.5 68.1829H51.2158V68.1119ZM51.2868 68.4671C51.3838 68.5248 51.4716 68.5967 51.5473 68.6802L51.6894 68.5382C51.6112 68.482 51.5227 68.4418 51.4289 68.4198L51.2868 68.4671Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr1-main-t"])}  d="M49.2266 70.6694H48.7527L46.4323 74.4065V75.1441L49.2503 74.2452V74.0562L51.3579 72.777L53.7497 74.411V73.1322L52.2578 72.1377L53.5602 71.2378V69.9353H51.0974L51.571 69.3196H50.2449L49.2266 70.6694Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr1-main-t-inner-l"])}  d="M49.0476 73.5451L48.1166 73.5451L49.0476 72.0058H49.2599L49.8374 71.434L50.7286 72.2299L49.0476 73.3288V73.5451Z"/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr1-main-t-inner-r"])}  d="M51.5562 71.5364L50.8782 71.0498H52.2342L51.5562 71.5364Z"/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr1-main-b"])}  d="M50.3339 73.871L49.4541 74.4303L51.9226 76.3816H53.6762V75.005L52.7988 75.6144L50.3339 73.871Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr1-stroke-tl-1"])}  d="M49.1923 69.3196H47.7812L46.456 71.4448V72.3745H47.3352L49.1923 69.3196Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr1-stroke-br-1"])}  d="M51.4053 73.0849L50.4598 73.7194L52.684 75.3109V73.9611L51.4053 73.0849Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr1-stroke-bl-1"])}  d="M49.2368 74.5791V75.5382L46.4136 76.4374V75.4797L49.2368 74.5791Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr2-main"])}  d="M53.5556 69.9353H56.5642V69.2723H57.9117V69.9353H60.9203V71.0246H57.9117V71.7114H60.2324V72.8007H57.9117V73.0138L60.8718 75.0622V76.4357L57.9117 74.3281V76.4196H56.5642V74.3542L53.6752 76.3806V75.005L56.5642 73.0115V72.7983H54.2435V71.709H56.5642V71.0223H53.5556" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr2-patch-b"])}  d="M53.7972 74.9236L53.7121 76.3483L53.6751 76.375H53.639V75.0322L53.7972 74.9236Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr2-patch-t"])}  d="M53.4836 69.9452H53.6214V71.021L53.4836 71.0247V69.9452Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr3-1"])}  d="M63.2693 70.9844H62.5826V69.6038H61.3512V70.9844H60.7828V72.0794H61.3512V74.0789L60.6171 74.3407V75.8879L63.2693 74.912V73.3648L62.5826 73.6266V72.0794H63.2693V70.9844Z" data-inverse={""}/>
                    <path className={joinClasses(styles["endfield-cn"], styles["chr3-2"])}  d="M62.843 72.1065V73.4046L63.4587 73.1678V75.891L64.5244 76.4357H68.1002V75.3227H64.7138V72.6941L64.998 72.5757V75.0622L66.2294 74.5412V72.1021L66.5609 71.9837V74.4228L67.7923 73.9255V70.184L66.2294 70.776V69.3315H64.998V71.2496L64.7138 71.368V70.1129H63.4587V71.8416L62.843 72.1065Z" data-inverse={""}/>
                </g>
            </g>
        </motion.svg>
    );
};
