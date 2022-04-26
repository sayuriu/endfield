import {FC} from "react";
import {HasAnimation, joinClasses} from "@utils/common";
import { motion } from "framer-motion";
import {AnimFunctions} from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import styles from "@components/logo/CN/CN-small.module.scss";


export const LogoSmall_CN: FC<HasAnimation> = ({ dontAnimateChild }) => {
    return (
        <motion.svg
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: Forceful }}
            data-logo={""}
            data-noanim={dontAnimateChild}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122 38"
            className={joinClasses(styles.logo, "fh")}
        >
            <path className={joinClasses(styles["arknights-cn"], "_0")} id={styles["arknights-cn-char-1-1"]} d="M1.5 4.6H3V0.5H0.599998V5.2H1.5V4.6ZM1.5 1.3H2.1V2.1H1.5V1.3ZM1.5 2.9H2.1V3.7H1.5V2.9Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_0")} id={styles["arknights-cn-char-1-2"]} d="M2.4 5.9L3.2 6.5C3.77569 5.9311 4.16012 5.19718 4.3 4.4H5.5V5.4H4.5C4.64553 5.71794 4.74649 6.05445 4.8 6.4L6.1 6.2C6.4 6 6.5 5.8 6.5 5.3V0.400002H3.5V2.8C3.5606 3.36612 3.49321 3.93862 3.30281 4.47519C3.11241 5.01176 2.80388 5.4987 2.4 5.9V5.9ZM4.4 1.3H5.5V1.9H4.4V1.3ZM4.4 2.8H5.5V3.5H4.4V2.8Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_1")} id={styles["arknights-cn-char-2"]} d="M8.1 5.9H10.9V6.4H11.9V0.5H7.1V6.4H8.1V5.9ZM8.1 1.5H10.9V2.7H8.1V1.5ZM8.1 3.7H10.9V5H8.1V3.7Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_2")} id={styles["arknights-cn-char-3"]} d="M12.4 5.7C12.684 5.91765 12.922 6.18958 13.1 6.5C13.6115 6.21178 14.0492 5.80896 14.3789 5.32316C14.7085 4.83735 14.9211 4.28177 15 3.7H17C16.9 4.7 16.8 5.3 16.6 5.4H15.1C15.318 5.69289 15.4559 6.03756 15.5 6.4H16.6C16.9365 6.37176 17.2536 6.23083 17.5 6C17.8593 5.11152 18.0296 4.15793 18 3.2V2.8H15.1C15.1746 2.57446 15.2085 2.33742 15.2 2.1H18.6V1.1H15.9L16.3 0.9L15.8 0L14.9 0.4L15.2 1.1H12.5V2.1H14.1C14.1893 2.79969 14.0767 3.51032 13.7755 4.14814C13.4743 4.78596 12.997 5.32439 12.4 5.7"/>
            <path className={joinClasses(styles["arknights-cn"], "_3")} id={styles["arknights-cn-char-4"]} d="M18.5 3.9H19.3C19.2782 4.26964 19.1777 4.63037 19.0053 4.95804C18.8328 5.28571 18.5924 5.57277 18.3 5.8C18.6278 5.95246 18.9054 6.1953 19.1 6.5C19.8152 5.81685 20.2442 4.88747 20.3 3.9H22.8V5.4H22C22.0848 5.70486 22.1849 6.00524 22.3 6.3H23.4C23.7 6.1 23.8 5.9 23.8 5.4V3.9H24.6V3H23.8V0.899997H21.8C21.9703 0.689841 22.1054 0.453435 22.2 0.199997H21C20.9693 0.47438 20.902 0.743427 20.8 0.999997H19.4V3H18.5V3.9ZM22.8 1.7V3H21.8L22.3 2.5L21.4 1.7H22.8ZM20.4 2.7V1.7H21.3L20.7 2.2L21.6 3H20.4V2.7ZM20.7 4.2C21.1093 4.44375 21.48 4.74707 21.8 5.1L22.4 4.5C22.0697 4.26279 21.6959 4.0929 21.3 4L20.7 4.2Z"/>

            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t"]} d="M11 13.5H9.99863L0.199997 26.9497V32.3958L12.1 28.6V27.8019L21 22.4L31.1 29.3V23.9L24.8 19.7L30.3 15.9V10.4H19.9L21.9 7.8H16.3L11 13.5Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t-inner-l"]} d="M10.3477 25.9335H6.09589L9.48803 19.4335H11.2442L13.2889 16.7247L17.2725 20.1703L10.3477 25.0659V25.9335Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t-inner-r"]} d="M20.65 16.7L17.6 15H23.8L20.65 16.7Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-b"]} d="M16.676 27.1281L12.9606 29.4611L23.385 37.6H30.805V31.85L27.085 34.4L16.676 27.1281Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-tl-1"]} d="M11.771 7.8H6.4L0.300003 17.0821V20.7H3.57989L11.771 7.8Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-br-1"]} d="M21.2 23.7L17.4 26.6L26.6 33.1V27.4L21.2 23.7Z"/>
            <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-bl-1"]} d="M12.0428 30.2454V33.813L0.120948 37.8574V33.813L12.0428 30.2454Z"/>
            <path className={joinClasses(styles["endfield-cn"])} id={styles["endfield-cn-chr2"]} d="M30.3 10.4H43.005V7.6H48.695V10.4H61.4V15H48.695V17.9H58.495V22.5H48.695V23.4L61.195 32.05V37.85L48.695 28.95V37.53H43.005V29.06L30.805 37.4804V31.84L43.005 23.39V22.49H33.205V17.89H43.005V14.99H30.3"/>
            <path className={joinClasses(styles["endfield-cn"])} id={styles["endfield-cn-chr3-1"]} d="M71.3 14.8301H68.4V9.00002H63.2V14.8301H60.8V19.454H63.2V27.8975L60.1 29.0032V35.5369L71.3 31.4157V24.882L68.4 25.9877V19.454H71.3V14.8301Z"/>
            <path className={joinClasses(styles["endfield-cn"])} id={styles["endfield-cn-chr3-2"]} d="M69.5 19.75V25.05L72.1 24.05V35.55L76.6 37.85H91.7V33.15H77.4V22.05L78.6 21.55V32.05L83.8 29.85V19.55L85.2 19.05V29.35L90.4 27.25V11.45L83.8 13.95V7.85H78.6V15.95L77.4 16.45V11.15H72.1V18.45L69.5 19.75Z"/>

            <path id={styles["en-square"]} d="M121.8 7.75001H91.7V37.85H121.8V7.75001Z"/>
            <path className={joinClasses(styles["arknights"], "_0")} id={styles["arknights-a"]} d="M95 28.45H95.7L97 31.65H96.2L96 31.15H94.9L94.7 31.65H93.9L95 28.45Z" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_0")} id={styles["arknights-a-inner"]} d="M95.02 30.65L95.42 29.45L95.87 30.65H95.02Z"/>
            <path className={joinClasses(styles["arknights"], "_1")} id={styles["arknights-r"]} d="M97.3 28.45H98.5C99.3 28.45 99.8 28.85 99.8 29.55C99.7968 29.7418 99.7386 29.9286 99.6322 30.0881C99.5258 30.2477 99.3758 30.3733 99.2 30.45L99.9 31.65H99.1L98.5 30.65H98.1V31.65H97.3V28.45Z" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_1")} id={styles["arknights-r-inner"]} d="M99 29.55C99 29.4439 98.9579 29.3422 98.8828 29.2672C98.8078 29.1921 98.7061 29.15 98.6 29.15H98.1V29.95H98.6C98.7061 29.95 98.8078 29.9079 98.8828 29.8328C98.9579 29.7578 99 29.6561 99 29.55V29.55Z"/>
            <path className={joinClasses(styles["arknights"], "_2")} id={styles["arknights-k"]} d="M101.05 30.55V31.65H100.25V28.45H101.05V29.65L101.45 29.15L102.25 28.45H103.25L101.85 29.75L103.25 31.65H102.35L101.35 30.35L101.05 30.55Z" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_3")} id={styles["arknights-n"]} d="M103.5 28.45H104.2L104.9 29.35L105.6 30.35H105.7C105.638 29.9529 105.605 29.5519 105.6 29.15V28.45H106.4V31.65H105.7L105 30.75L104.3 29.75V31.65H103.5V28.45Z" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_4")} id={styles["arknights-i"]} d="M106.8 28.45H107.6V31.65H106.8V28.45Z" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_5")} id={styles["arknights-g"]} d="M107.92 30.05C107.905 29.8229 107.939 29.5954 108.019 29.3824C108.1 29.1695 108.224 28.9762 108.385 28.8153C108.546 28.6544 108.74 28.5297 108.952 28.4494C109.165 28.3692 109.393 28.3353 109.62 28.35C109.916 28.345 110.207 28.4278 110.456 28.588C110.705 28.7482 110.902 28.9785 111.02 29.25L110.22 29.45C110.153 29.3538 110.063 29.2758 109.958 29.2234C109.853 29.171 109.737 29.1458 109.62 29.15C109.381 29.15 109.152 29.2448 108.984 29.4136C108.815 29.5824 108.72 29.8113 108.72 30.05C108.72 30.2887 108.815 30.5176 108.984 30.6864C109.152 30.8552 109.381 30.95 109.62 30.95C110.12 30.95 110.42 30.75 110.42 30.45H109.62V29.85H111.12V31.65H110.42V31.45C110.32 31.65 109.92 31.75 109.62 31.75C109.393 31.7647 109.165 31.7308 108.952 31.6506C108.74 31.5703 108.546 31.4456 108.385 31.2847C108.224 31.1238 108.1 30.9305 108.019 30.7175C107.939 30.5046 107.905 30.277 107.92 30.05" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_6")} id={styles["arknights-h"]} d="M113.5 29.65V28.45H114.3V31.65H113.5V30.45H112.3V31.65H111.5V28.45H112.3V29.65H113.5Z" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_7")} id={styles["arknights-t"]} d="M116.2 31.65H115.5V29.15H114.5V28.45H117.2V29.15H116.2V31.65Z" data-inverse={""}/>
            <path className={joinClasses(styles["arknights"], "_8")} id={styles["arknights-s"]} d="M118.12 30.25C117.907 30.2073 117.714 30.0963 117.569 29.9339C117.425 29.7715 117.337 29.5666 117.32 29.35C117.333 29.2053 117.374 29.0646 117.441 28.9358C117.508 28.8071 117.6 28.693 117.712 28.6C117.823 28.5071 117.952 28.4371 118.091 28.3942C118.23 28.3513 118.375 28.3363 118.52 28.35C118.793 28.3414 119.06 28.4258 119.278 28.5894C119.496 28.753 119.652 28.986 119.72 29.25L119.02 29.45C119.008 29.3837 118.983 29.3205 118.946 29.2642C118.909 29.2079 118.861 29.1596 118.805 29.1222C118.749 29.0849 118.686 29.0592 118.62 29.0468C118.554 29.0344 118.486 29.0355 118.42 29.05C118.22 29.05 118.12 29.15 118.12 29.25C118.12 29.35 118.42 29.55 118.82 29.75C119.22 29.95 119.82 30.15 119.82 30.75C119.82 31.35 119.32 31.75 118.52 31.75C118.209 31.7629 117.902 31.6716 117.648 31.4904C117.395 31.3093 117.209 31.0487 117.12 30.75L117.92 30.55C118.02 30.75 118.22 31.05 118.52 31.05C118.82 31.05 118.92 30.95 118.92 30.75C118.92 30.55 118.62 30.45 118.12 30.25" data-inverse={""}/>

            <path className={joinClasses(styles["endfield"], "_0")} id={styles["endfield-e-1"]} d="M96.7 36.25H93.8V32.45H96.7V33.25H94.8V33.95H96.2V34.75H94.8V35.45H96.7V36.25Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_1")} id={styles["endfield-n"]} d="M100.7 36.25H99.8L99 35.25L98.2 33.95C98.1 33.95 98.2 34.55 98.2 35.45V36.25H97.2V32.45H98.1L98.9 33.55L99.8 34.65V32.45H100.7V36.25Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_2")} id={styles["endfield-d-1"]} d="M106.6 36.25H101.3V32.45H103C103.258 32.4364 103.516 32.4755 103.758 32.5649C104 32.6543 104.221 32.7921 104.409 32.9699C104.596 33.1477 104.745 33.3617 104.846 33.599C104.948 33.8363 105 34.0918 105 34.35C105 34.6081 104.948 34.8637 104.846 35.1009C104.745 35.3382 104.596 35.5523 104.409 35.7301C104.221 35.9079 104 36.0457 103.758 36.1351C103.516 36.2245 103.258 36.2636 103 36.25" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_2")} id={styles["endfield-d-2-inner"]} d="M103 33.25H102.2V35.45H103C103.14 35.4507 103.279 35.4219 103.407 35.3655C103.536 35.3092 103.651 35.2264 103.745 35.1227C103.839 35.019 103.911 34.8966 103.955 34.7635C103.999 34.6303 104.014 34.4895 104 34.35C104.001 34.0748 103.899 33.8091 103.714 33.6055C103.529 33.4019 103.274 33.275 103 33.25"/>
            <path className={joinClasses(styles["endfield"], "_3")} id={styles["endfield-f"]} d="M107.9 33.25H106.2V34.05H107.6V34.85H106.2V36.25H105.3V32.45H108L107.9 33.25Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_4")} id={styles["endfield-i"]} d="M109.35 36.25H108.45V32.45H109.35V36.25Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_5")} id={styles["endfield-e-2"]} d="M112.7 36.25H109.9V32.45H112.7V33.25H110.8V33.95H112.3V34.75H110.8V35.45H112.7V36.25Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_6")} id={styles["endfield-l"]} d="M116 36.25H113.3V32.45H114.2V35.45H116V36.25Z" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_7")} id={styles["endfield-d-2"]} d="M120.8 36.25H116.3V32.45H118C118.258 32.4364 118.516 32.4755 118.758 32.5649C119 32.6543 119.221 32.7921 119.409 32.9699C119.596 33.1477 119.745 33.3617 119.846 33.599C119.948 33.8363 120 34.0918 120 34.35C120 34.6081 119.948 34.8637 119.846 35.1009C119.745 35.3382 119.596 35.5523 119.409 35.7301C119.221 35.9079 119 36.0457 118.758 36.1351C118.516 36.2245 118.258 36.2636 118 36.25" data-inverse={""}/>
            <path className={joinClasses(styles["endfield"], "_7")} id={styles["endfield-d-2-inner_2"]} d="M118 33.25H117.2V35.45H118C118.14 35.4507 118.279 35.4219 118.407 35.3655C118.536 35.3092 118.651 35.2264 118.745 35.1227C118.839 35.019 118.911 34.8966 118.955 34.7635C118.999 34.6303 119.014 34.4895 119 34.35C119.001 34.0748 118.899 33.8091 118.714 33.6055C118.529 33.4019 118.274 33.275 118 33.25"/>
        </motion.svg>
    );
};
