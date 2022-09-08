import { FC } from "react";
import {HasAnimation, joinClasses} from "@utils/common";
import { motion } from "framer-motion";
import { AnimFunctions } from "@utils/anims";
const { Forceful } = AnimFunctions;
import styles from "./CN-small.module.scss";
import { LogoSmallProps } from "@components/logo/logo.types";


export const LogoSmall_CN: FC<HasAnimation & LogoSmallProps> = ({ dontAnimateChild, opacity = 1 }) => {
    return (
        <motion.svg
            fill="none"
            initial={{ opacity: 1 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5, ease: Forceful }}
            data-logo={""}
            data-noanim={dontAnimateChild}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122 38"
            className={joinClasses(styles.logo, "fh")}
        >
            <path className={joinClasses(styles["arknights-cn"], "_0")} id={styles["arknights-cn-char-1-1"]} d="M1.5 4.6H3V0.5H0.599998V5.2H1.5V4.6ZM1.5 1.3H2.1V2.1H1.5V1.3ZM1.5 2.9H2.1V3.7H1.5V2.9Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_0")} id={styles["arknights-cn-char-1-2"]} d="M2.4 5.9L3.2 6.5C3.77569 5.9311 4.16012 5.19718 4.3 4.4H5.5V5.4H4.5C4.64553 5.71794 4.74649 6.05445 4.8 6.4L6.1 6.2C6.4 6 6.5 5.8 6.5 5.3V0.400002H3.5V2.8C3.5606 3.36612 3.49321 3.93862 3.30281 4.47519C3.11241 5.01176 2.80388 5.4987 2.4 5.9ZM4.4 1.3H5.5V1.9H4.4V1.3ZM4.4 2.8H5.5V3.5H4.4V2.8Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_1")} id={styles["arknights-cn-char-2"]} d="M8.1 5.9H10.9V6.4H11.9V0.5H7.1V6.4H8.1V5.9ZM8.1 1.5H10.9V2.7H8.1V1.5ZM8.1 3.7H10.9V5H8.1V3.7Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_2")} id={styles["arknights-cn-char-3"]} d="M12.4 5.7C12.684 5.91764 12.922 6.18958 13.1 6.5C13.6115 6.21178 14.0492 5.80896 14.3789 5.32316C14.7085 4.83735 14.9211 4.28177 15 3.7H17C16.9 4.7 16.8 5.3 16.6 5.4H15.1C15.318 5.69289 15.4559 6.03756 15.5 6.4H16.6C16.9365 6.37176 17.2536 6.23083 17.5 6C17.8593 5.11152 18.0296 4.15793 18 3.2V2.8H15.1C15.1746 2.57446 15.2085 2.33742 15.2 2.1H18.6V1.1H15.9L16.3 0.9L15.8 0L14.9 0.4L15.2 1.1H12.5V2.1H14.1C14.1893 2.79969 14.0767 3.51032 13.7755 4.14814C13.4743 4.78596 12.997 5.32439 12.4 5.7Z"/>
            <path className={joinClasses(styles["arknights-cn"], "_3")} id={styles["arknights-cn-char-4"]} d="M18.5 3.9H19.3C19.2782 4.26964 19.1777 4.63037 19.0053 4.95804C18.8328 5.28571 18.5924 5.57277 18.3 5.8C18.6278 5.95246 18.9054 6.1953 19.1 6.5C19.8152 5.81685 20.2442 4.88747 20.3 3.9H22.8V5.4H22C22.0848 5.70486 22.1849 6.00524 22.3 6.3H23.4C23.7 6.1 23.8 5.9 23.8 5.4V3.9H24.6V3H23.8V0.899997H21.8C21.9703 0.689841 22.1054 0.453435 22.2 0.199997H21C20.9693 0.47438 20.902 0.743427 20.8 0.999997H19.4V3H18.5V3.9ZM22.8 1.7V3H21.8L22.3 2.5L21.4 1.7H22.8ZM20.4 2.7V1.7H21.3L20.7 2.2L21.6 3H20.4V2.7ZM20.7 4.2C21.1093 4.44375 21.48 4.74707 21.8 5.1L22.4 4.5C22.0697 4.26279 21.6959 4.0929 21.3 4L20.7 4.2Z"/>

            <g className={joinClasses(styles["g-chr1"], "_0")}>
                <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t"]} d="M12 13.5H9.99863L0.199997 29.2809V32.3958L12.1 28.6V27.8019L21 22.4L31.1 29.3V23.9L24.8 19.7L30.3 15.9V10.4H19.9L21.9 7.8H16.3L12 13.5Z"/>
                <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t-inner-l"]} d="M11.2442 25.6433L7.31284 25.6433L11.2442 19.1433H12.1407L14.5794 16.7285L18.3426 20.0895L11.2442 24.7757V25.6433Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-t-inner-r"]} d="M21.8376 17.161L18.9746 15.1063H24.7007L21.8376 17.161Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-main-b"]} d="M16.676 27.0195L12.9606 29.3815L23.385 37.6215H30.805V31.8001L27.085 34.3818L16.676 27.0195Z"/>
                <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-tl-1"]} d="M11.8552 7.8H5.89646L0.300003 16.7743V20.7H4.01272L11.8552 7.8Z"/>
                <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-br-1"]} d="M21.2 23.7L17.2075 26.3793L26.6 33.1V27.4L21.2 23.7Z"/>
                <path className={joinClasses(styles["endfield-cn"], styles["chr1"])} id={styles["endfield-cn-chr1-stroke-bl-1"]} d="M12.0428 30.01V34.06L0.120948 37.8574V33.813L12.0428 30.01Z"/>
            </g>
            <g className={joinClasses(styles["g-chr2"], "_1")}>
                <path className={styles["patch"]} d="M31.3008 31.4648L30.9414 37.481L30.7852 37.5937H30.6328V31.9234L31.3008 31.4648Z"/>
                <path className={joinClasses(styles["endfield-cn"])} id={styles["endfield-cn-chr2"]} d="M30.2806 10.4H42.9856V7.6H48.6756V10.4H61.3806V15H48.6756V17.9H58.4756V22.5H48.6756V23.4L61.1756 32.05V37.85L48.6756 28.95V37.7819H42.9856V29.06L30.7856 37.6172V31.8086L42.9856 23.39V22.49H33.1856V17.89H42.9856V14.99H30.2806"/>
                <path className={styles["patch"]} d="M29.9766 10.4335H30.5586V14.9844L29.9766 15V10.4335Z"/>
            </g>
            <g className={joinClasses(styles["g-chr3"], "_2")}>
                <path className={joinClasses(styles["endfield-cn"])} id={styles["endfield-cn-chr3-1"]} d="M71.3 14.8301H68.4V9.00002H63.2V14.8301H60.8V19.454H63.2V27.8975L60.1 29.0032V35.5369L71.3 31.4157V24.882L68.4 25.9877V19.454H71.3V14.8301Z"/>
                <path className={joinClasses(styles["endfield-cn"])} id={styles["endfield-cn-chr3-2"]} d="M69.5 19.5687V25.05L72.1 24.05V35.55L76.6 37.85H91.7V33.15H77.4V22.05L78.6 21.55V32.05L83.8 29.85V19.55L85.2 19.05V29.35L90.4 27.25V11.45L83.8 13.95V7.85H78.6V15.95L77.4 16.45V11.15H72.1V18.45L69.5 19.5687Z"/>
            </g>

            <g className={joinClasses(styles["g-chr4"], "_3")}>
                <rect id={styles["en-square"]} x={91.72} y={7.75} width={30.04} height={30.04} strokeWidth={0.15} stroke="#fff" fill="#fff"/>
                <path className={joinClasses(styles["arknights"], "_0")} id={styles["arknights-a"]} d="M94.98 28.45H95.68L96.98 31.65H96.18L95.98 31.15H94.88L94.68 31.65H93.88L94.98 28.45Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_0")} id={styles["arknights-a-inner"]} d="M95 30.65L95.4 29.45L95.85 30.65H95Z"/>
                <path className={joinClasses(styles["arknights"], "_1")} id={styles["arknights-r"]} d="M97.28 28.45H98.48C99.28 28.45 99.78 28.85 99.78 29.55C99.7768 29.7418 99.7186 29.9286 99.6122 30.0881C99.5058 30.2477 99.3558 30.3733 99.18 30.45L99.88 31.65H99.08L98.48 30.65H98.08V31.65H97.28V28.45Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_1")} id={styles["arknights-r-inner"]} d="M98.98 29.55C98.98 29.4439 98.9378 29.3422 98.8628 29.2672C98.7878 29.1921 98.6861 29.15 98.58 29.15H98.08V29.95H98.58C98.6861 29.95 98.7878 29.9079 98.8628 29.8328C98.9378 29.7578 98.98 29.6561 98.98 29.55Z"/>
                <path className={joinClasses(styles["arknights"], "_2")} id={styles["arknights-k"]} d="M101.03 30.55V31.65H100.23V28.45H101.03V29.65L101.43 29.15L102.23 28.45H103.23L101.83 29.75L103.23 31.65H102.33L101.33 30.35L101.03 30.55Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_3")} id={styles["arknights-n"]} d="M103.48 28.45H104.18L104.88 29.35L105.58 30.35H105.68C105.618 29.9529 105.585 29.5519 105.58 29.15V28.45H106.38V31.65H105.68L104.98 30.75L104.28 29.75V31.65H103.48V28.45Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_4")} id={styles["arknights-i"]} d="M106.78 28.45H107.58V31.65H106.78V28.45Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_5")} id={styles["arknights-g"]} d="M107.9 30.05C107.885 29.8229 107.919 29.5954 107.999 29.3824C108.08 29.1695 108.204 28.9762 108.365 28.8153C108.526 28.6544 108.72 28.5297 108.932 28.4494C109.145 28.3692 109.373 28.3353 109.6 28.35C109.896 28.345 110.187 28.4278 110.436 28.588C110.685 28.7482 110.882 28.9785 111 29.25L110.2 29.45C110.133 29.3538 110.043 29.2758 109.938 29.2234C109.833 29.171 109.717 29.1458 109.6 29.15C109.361 29.15 109.132 29.2448 108.964 29.4136C108.795 29.5824 108.7 29.8113 108.7 30.05C108.7 30.2887 108.795 30.5176 108.964 30.6864C109.132 30.8552 109.361 30.95 109.6 30.95C110.1 30.95 110.4 30.75 110.4 30.45H109.6V29.85H111.1V31.65H110.4V31.45C110.3 31.65 109.9 31.75 109.6 31.75C109.373 31.7647 109.145 31.7308 108.932 31.6506C108.72 31.5703 108.526 31.4456 108.365 31.2847C108.204 31.1238 108.08 30.9305 107.999 30.7175C107.919 30.5046 107.885 30.277 107.9 30.05Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_6")} id={styles["arknights-h"]} d="M113.48 29.65V28.45H114.28V31.65H113.48V30.45H112.28V31.65H111.48V28.45H112.28V29.65H113.48Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_7")} id={styles["arknights-t"]} d="M116.18 31.65H115.48V29.15H114.48V28.45H117.18V29.15H116.18V31.65Z" data-inverse={""}/>
                <path className={joinClasses(styles["arknights"], "_8")} id={styles["arknights-s"]} d="M118.1 30.25C117.887 30.2073 117.694 30.0963 117.549 29.9339C117.405 29.7715 117.317 29.5666 117.3 29.35C117.313 29.2053 117.354 29.0646 117.421 28.9358C117.488 28.8071 117.58 28.693 117.692 28.6C117.803 28.5071 117.932 28.4371 118.071 28.3942C118.21 28.3513 118.355 28.3363 118.5 28.35C118.773 28.3414 119.04 28.4258 119.258 28.5894C119.476 28.753 119.632 28.986 119.7 29.25L119 29.45C118.988 29.3837 118.963 29.3205 118.926 29.2642C118.889 29.2079 118.841 29.1596 118.785 29.1222C118.729 29.0849 118.666 29.0592 118.6 29.0468C118.534 29.0344 118.466 29.0355 118.4 29.05C118.2 29.05 118.1 29.15 118.1 29.25C118.1 29.35 118.4 29.55 118.8 29.75C119.2 29.95 119.8 30.15 119.8 30.75C119.8 31.35 119.3 31.75 118.5 31.75C118.189 31.7629 117.882 31.6716 117.628 31.4904C117.375 31.3093 117.189 31.0487 117.1 30.75L117.9 30.55C118 30.75 118.2 31.05 118.5 31.05C118.8 31.05 118.9 30.95 118.9 30.75C118.9 30.55 118.6 30.45 118.1 30.25Z" data-inverse={""}/>

                <path className={joinClasses(styles["endfield"], "_0")} id={styles["endfield-e-1"]} d="M96.68 36.25H93.78V32.45H96.68V33.25H94.78V33.95H96.18V34.75H94.78V35.45H96.68V36.25Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_1")} id={styles["endfield-n"]} d="M100.68 36.25H99.78L98.98 35.25L98.18 33.95C98.08 33.95 98.18 34.55 98.18 35.45V36.25H97.18V32.45H98.08L98.88 33.55L99.78 34.65V32.45H100.68V36.25Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_2")} id={styles["endfield-d-1"]} d="M106.58 36.25H101.28V32.45H102.98C103.238 32.4364 103.496 32.4755 103.738 32.5649C103.98 32.6543 104.201 32.7921 104.389 32.9699C104.576 33.1477 104.725 33.3617 104.826 33.599C104.928 33.8363 104.98 34.0918 104.98 34.35C104.98 34.6081 104.928 34.8637 104.826 35.1009C104.725 35.3382 104.576 35.5523 104.389 35.7301C104.201 35.9079 103.98 36.0457 103.738 36.1351C103.496 36.2245 103.238 36.2636 102.98 36.25" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_2")} id={styles["endfield-d-2-inner"]} d="M102.98 33.25H102.18V35.45H102.98C103.12 35.4507 103.259 35.4219 103.387 35.3655C103.516 35.3092 103.631 35.2264 103.725 35.1227C103.819 35.019 103.891 34.8966 103.935 34.7635C103.979 34.6303 103.994 34.4895 103.98 34.35C103.981 34.0748 103.879 33.8091 103.694 33.6055C103.509 33.4019 103.254 33.275 102.98 33.25Z"/>
                <path className={joinClasses(styles["endfield"], "_3")} id={styles["endfield-f"]} d="M107.88 33.25H106.18V34.05H107.58V34.85H106.18V36.25H105.28V32.45H107.98L107.88 33.25Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_4")} id={styles["endfield-i"]} d="M109.33 36.25H108.43V32.45H109.33V36.25Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_5")} id={styles["endfield-e-2"]} d="M112.68 36.25H109.88V32.45H112.68V33.25H110.78V33.95H112.28V34.75H110.78V35.45H112.68V36.25Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_6")} id={styles["endfield-l"]} d="M115.98 36.25H113.28V32.45H114.18V35.45H115.98V36.25Z" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_7")} id={styles["endfield-d-2"]} d="M120.78 36.25H116.28V32.45H117.98C118.238 32.4364 118.496 32.4755 118.738 32.5649C118.98 32.6543 119.201 32.7921 119.389 32.9699C119.576 33.1477 119.725 33.3617 119.826 33.599C119.928 33.8363 119.98 34.0918 119.98 34.35C119.98 34.6081 119.928 34.8637 119.826 35.1009C119.725 35.3382 119.576 35.5523 119.389 35.7301C119.201 35.9079 118.98 36.0457 118.738 36.1351C118.496 36.2245 118.238 36.2636 117.98 36.25" data-inverse={""}/>
                <path className={joinClasses(styles["endfield"], "_7")} id={styles["endfield-d-2-inner_2"]} d="M117.98 33.25H117.18V35.45H117.98C118.12 35.4507 118.259 35.4219 118.387 35.3655C118.516 35.3092 118.631 35.2264 118.725 35.1227C118.819 35.019 118.891 34.8966 118.935 34.7635C118.979 34.6303 118.994 34.4895 118.98 34.35C118.981 34.0748 118.879 33.8091 118.694 33.6055C118.509 33.4019 118.254 33.275 117.98 33.25Z"/>
            </g>
        </motion.svg>
    );
};
