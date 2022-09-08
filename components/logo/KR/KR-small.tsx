import { HasAnimation, joinClasses, joinModuleClasses, whichWider } from "@utils/common";
import { FC } from "react";
import { motion } from "framer-motion";
import { AnimFunctions } from "@utils/anims";
const { Forceful } = AnimFunctions;
import styles from "./KR-small.module.scss";
import { LogoSmallProps } from "@components/logo/logo.types";

const moduleClasses = joinModuleClasses(styles);

export const LogoSmall_KR: FC<HasAnimation & LogoSmallProps> = ({dontAnimateChild, opacity}) => {
    return (
        <motion.svg
            fill="none"
            initial={{ opacity: 1 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5, ease: Forceful }}
            data-logo={""}
            viewBox="0 0 143 35"
            xmlns="http://www.w3.org/2000/svg"
            data-noanim={dontAnimateChild}
            className={joinClasses(styles.logo, "fh")}
        >
            <g className={styles["arknights-kr"]}>
                <g className={joinClasses(styles["char-1"], "_0")}>
                    <path className={styles["t-l"]} d="M0.867661 0.958469H3.66766V3.75847H0.867661V0.958469Z"/>
                    <path className={styles["t-l-inner"]} d="M1.36766 3.25847H3.26766V1.45847H1.36766V3.25847Z" data-inverse=""/>
                    <path className={styles["t-r"]} d="M5.76766 3.95847H5.26766V3.05847H3.96766V2.55847H5.26766V2.05847H3.96766V1.55847H5.26766V0.658466H5.76766V3.95847Z"/>
                    <path className={moduleClasses("b", "no-fill")} d="M5.5502 5.16322C5.5502 5.34121 5.40884 5.5587 5.05374 5.7456C4.70948 5.92677 4.21765 6.04592 3.6615 6.04592C3.10536 6.04592 2.61353 5.92677 2.26927 5.7456C1.91417 5.5587 1.77281 5.34121 1.77281 5.16322C1.77281 4.98524 1.91417 4.76774 2.26927 4.58085C2.61353 4.39967 3.10536 4.28053 3.6615 4.28053C4.21765 4.28053 4.70948 4.39967 5.05374 4.58085C5.40884 4.76774 5.5502 4.98524 5.5502 5.16322Z" strokeWidth="0.47"/>
                </g>
                <g className={joinClasses(styles["char-2"], "_1")}>
                    <path className={styles["t-r"]} d="M10.9677 0.658466H11.4677V3.95847H10.9677V0.658466Z"/>
                    <path className={moduleClasses("t-l", "no-fill")} d="M9.22209 2.36696C9.22209 2.99715 8.69128 3.52152 8.01956 3.52152C7.34785 3.52152 6.81704 2.99715 6.81704 2.36696C6.81704 1.73676 7.34785 1.21239 8.01956 1.21239C8.69128 1.21239 9.22209 1.73676 9.22209 2.36696Z" strokeWidth="0.47"/>
                    <path className={styles["b"]} d="M7.36766 6.25847V4.85847H10.8677V4.65847H7.36766V4.15847H11.3677V5.35847H7.86766V5.75847H11.4677V6.25847H7.36766Z"/>
                </g>
                <g className={joinClasses(styles["char-3"], "_2")}>
                    <path className={styles["t-r"]} d="M17.2677 2.55847H16.2677V3.95847H15.7677V0.658466H16.2677V2.05847H17.2677V2.55847Z"/>
                    <path className={styles["t-l"]} d="M14.2677 1.05847H14.7677V3.65847H12.1677V1.05847H12.6677V1.95847H14.2677V1.05847Z"/>
                    <path className={styles["t-l-inner"]} d="M12.6677 3.15847H14.2677V2.45847H12.6677V3.15847Z" data-inverse=""/>
                    <path className={moduleClasses("b", "no-fill")} d="M16.1511 5.18104C16.1511 5.37163 16.0205 5.5848 15.7223 5.76299C15.4289 5.9383 15.0084 6.05434 14.5313 6.05434C14.0542 6.05434 13.6337 5.9383 13.3403 5.76299C13.0421 5.5848 12.9115 5.37163 12.9115 5.18104C12.9115 4.99044 13.0421 4.77727 13.3403 4.59908C13.6337 4.42377 14.0542 4.30773 14.5313 4.30773C15.0084 4.30773 15.4289 4.42377 15.7223 4.59908C16.0205 4.77727 16.1511 4.99044 16.1511 5.18104Z" strokeWidth="0.47"/>
                </g>
                <g className={joinClasses(styles["char-4"], "_3")}>
                    <path className={styles["b"]} fillRule="evenodd" clipRule="evenodd" d="M19.9677 6.25847H20.4677V4.15847H22.8677V3.65847H17.5677V4.15847H19.9677V6.25847Z"/>
                    <path className={styles["t"]} d="M18.3677 3.35847L18.0677 2.85847C19.1677 2.55847 19.8677 2.05847 20.0677 1.35847H18.1677V0.958469H22.2677V1.35847H20.4677V1.65847C20.966 2.28858 21.6771 2.71525 22.4677 2.85847C22.3245 2.99511 22.2209 3.16785 22.1677 3.35847C21.4196 3.17819 20.7519 2.75644 20.2677 2.15847C19.7294 2.69217 19.0809 3.10174 18.3677 3.35847Z"/>
                </g>
            </g>
            <g className={styles["endfield-kr"]}>
                <g className={styles["char-1"]}>
                    <path className={styles["t-l"]} d="M12.5898 23.0548C11.3231 23.9469 9.81676 24.4361 8.26766 24.4585C6.25202 24.4585 4.31893 23.6578 2.89365 22.2325C1.46838 20.8072 0.667664 18.8741 0.667664 16.8585C0.667664 14.8428 1.46838 12.9097 2.89365 11.4845C4.31893 10.0592 6.25202 9.25847 8.26766 9.25847C9.81676 9.28088 11.3231 9.77007 12.5898 10.6621C13.8564 11.5541 14.8246 12.8075 15.3677 14.2585H17.3677L18.7677 7.55847H23.9677L19.9677 26.1585H14.7677L16.2677 19.4585H15.3677C14.8246 20.9094 13.8564 22.1628 12.5898 23.0548Z"/>
                    <path className={styles["t-l-inner"]} d="M10.2476 14.8786C9.72246 14.3535 9.01027 14.0585 8.26767 14.0585C7.52506 14.0585 6.81287 14.3535 6.28777 14.8786C5.76267 15.4037 5.46767 16.1159 5.46767 16.8585C5.46767 17.6011 5.76267 18.3133 6.28777 18.8384C6.81287 19.3635 7.52506 19.6585 8.26767 19.6585C9.01027 19.6585 9.72246 19.3635 10.2476 18.8384C10.7727 18.3133 11.0677 17.6011 11.0677 16.8585C11.0677 16.1159 10.7727 15.4037 10.2476 14.8786Z" data-inverse=""/>
                    <path className={styles["t-r"]} d="M25.8677 26.1585H20.6677L24.6677 7.55847H27.9677V16.3585L25.8677 26.1585Z"/>
                </g>
                <g className={styles["movement-1"]}>
                    <path className={moduleClasses("char-1", "b")} d="M1.96766 26.1585H7.16766L6.46766 29.4585H27.8677L23.2677 34.6585H0.767662V31.7585L1.96766 26.1585Z"/>
                    <path className={moduleClasses("char-2", "b")} d="M56.6677 34.6585H29.4677L34.0677 29.4585H56.6677V34.6585Z"/>
                </g>
                <g className={styles["char-2"]}>
                    <path className={styles["t"]} d="M35.6677 22.0585H55.5677L50.9677 27.2585H30.4677V7.55847H55.5677L50.9677 12.7585H35.6677V22.0585Z"/>
                </g>
                <g className={styles["char-3"]}>
                    <path className={styles["t-l"]} d="M73.7677 15.7585H77.1677L76.2677 20.9585H58.1677V15.7585H60.5677L61.1677 12.7585H58.1677V7.55847H78.1677L77.1677 12.7585H74.4677L73.7677 15.7585Z"/>
                    <path className={styles["t-l-inner"]} d="M65.7677 15.7585H68.6677L69.2677 12.7585H66.3677L65.7677 15.7585Z" data-inverse=""/>
                    <path className={joinClasses(styles["t-r"], "_0")} d="M83.9677 20.9585H78.7677L81.5677 7.55847H85.3677V14.2585L83.9677 20.9585Z"/>
                    <path className={joinClasses(styles["b"], "_1")} d="M68.8677 26.9585H58.1677V22.3585H85.3677V26.9585L74.6677 29.9585H85.3677V34.6585H58.1677V29.9585L68.8677 26.9585Z"/>
                </g>
                <g className={styles["char-4"]}>
                    <path className={joinClasses(styles["b"], "_0")} d="M114.068 34.6585H86.8677V29.4585H114.068V34.6585Z"/>
                    <path className={joinClasses(styles["t"], "_1")} d="M93.0677 22.0585H111.968L107.368 27.2585H87.8677V7.55847H111.968L107.368 12.7585H93.0677V22.0585Z"/>
                </g>
                <mask id="endfield-kr-small-logo-en-mask">
                    <path d="M142.968 7.55846H115.868V34.6585H142.968V7.55846Z"/>
                </mask>
                <g className={styles["en"]} mask="url(#endfield-kr-small-logo-en-mask)">
                    <mask id="endfield-kr-logo-en-square">
                        <use xlinkHref={"#" + styles["en-square"]}/>
                    </mask>
                    <path id={styles["en-square"]} d="M142.968 7.55846H115.868V34.6585H142.968V7.55846Z"/>
                    <g className={joinClasses(styles["arknights"], "_1")} mask="url(#endfield-kr-logo-en-square)">
                        <path className={styles["a"]} d="M118.748 26.1637H119.521L120.565 29.0699H119.838L119.657 28.6158H118.658L118.476 29.0699H117.749L118.748 26.1637Z" data-inverse=""/>
                        <path className={styles["a-inner"]} d="M118.767 28.1617L119.13 27.0719L119.539 28.1617H118.767Z"/>
                        <path className={styles["r"]} d="M120.837 26.1637H121.927C122.654 26.1637 123.108 26.527 123.108 27.1627C123.105 27.3369 123.052 27.5065 122.955 27.6514C122.859 27.7964 122.722 27.9104 122.563 27.9801L123.198 29.0699H122.472L121.927 28.1617H121.564V29.0699H120.837V26.1637Z" data-inverse=""/>
                        <path className={styles["r-inner"]} d="M122.381 27.1627C122.381 27.0664 122.343 26.974 122.275 26.9058C122.207 26.8377 122.114 26.7994 122.018 26.7994H121.564V27.526H122.018C122.114 27.526 122.207 27.4877 122.275 27.4196C122.343 27.3514 122.381 27.259 122.381 27.1627Z"/>
                        <path className={styles["k"]} d="M124.243 28.0709V29.0699H123.516V26.1637H124.243V27.2535L125.333 26.1637H126.241L124.969 27.3444L126.241 29.0699H125.424L124.515 27.8893L124.243 28.0709Z" data-inverse=""/>
                        <path className={styles["n"]} d="M126.468 26.1637H127.104L128.375 27.8248V26.1637L129.102 26.1637V29.0699H128.466L127.194 27.3444V29.0699H126.468V26.1637Z" data-inverse=""/>
                        <path className={styles["i"]} d="M129.465 26.1637H130.191V29.0699H129.465V26.1637Z" data-inverse=""/>
                        <path className={styles["g"]} d="M130.482 27.6168C130.469 27.4106 130.499 27.2039 130.572 27.0105C130.645 26.8172 130.759 26.6416 130.905 26.4955C131.051 26.3493 131.226 26.2361 131.42 26.1632C131.613 26.0903 131.82 26.0595 132.026 26.0729C132.295 26.0684 132.559 26.1436 132.785 26.2891C133.012 26.4345 133.19 26.6437 133.297 26.8902L132.571 27.0719C132.51 26.9845 132.428 26.9137 132.333 26.8661C132.238 26.8185 132.132 26.7956 132.026 26.7994C131.809 26.7994 131.601 26.8855 131.448 27.0388C131.295 27.1921 131.209 27.4 131.209 27.6168C131.209 27.8336 131.295 28.0415 131.448 28.1948C131.601 28.348 131.809 28.4342 132.026 28.4342C132.48 28.4342 132.753 28.2525 132.753 27.9801H132.026V27.4352H133.388V29.0699H132.753V28.8882C132.662 29.0699 132.298 29.1607 132.026 29.1607C131.82 29.174 131.613 29.1433 131.42 29.0704C131.226 28.9975 131.051 28.8842 130.905 28.7381C130.759 28.592 130.645 28.4164 130.572 28.223C130.499 28.0297 130.469 27.823 130.482 27.6168Z" data-inverse=""/>
                        <path className={styles["h"]} d="M135.55 27.2535V26.1637H136.276V29.0699H135.55V27.9801H134.46V29.0699H133.733V26.1637H134.46V27.2535H135.55Z" data-inverse=""/>
                        <path className={styles["t"]} d="M138.002 29.0699H137.366V26.7994H136.458V26.1637H138.91V26.7994H138.002V29.0699Z" data-inverse=""/>
                        <path className={styles["s"]} d="M139.745 27.7984C139.564 27.7258 139.376 27.6588 139.245 27.5114C139.114 27.3639 139.035 27.1777 139.019 26.9811C139.03 26.8497 139.068 26.7218 139.129 26.6049C139.19 26.488 139.273 26.3844 139.375 26.3C139.476 26.2155 139.593 26.152 139.719 26.113C139.845 26.0741 139.977 26.0604 140.109 26.0729C140.356 26.0651 140.599 26.1417 140.797 26.2903C140.995 26.4389 141.137 26.6505 141.199 26.8903L140.563 27.0719C140.552 27.0117 140.529 26.9543 140.496 26.9031C140.462 26.852 140.419 26.8081 140.368 26.7742C140.317 26.7403 140.26 26.717 140.2 26.7057C140.139 26.6944 140.072 26.6652 140.012 26.6783C139.831 26.6783 139.745 26.7994 139.745 26.8903C139.745 26.9811 140.018 27.1627 140.381 27.3443C140.744 27.526 141.289 27.7076 141.289 28.2525C141.289 28.7974 140.835 29.1607 140.109 29.1607C139.826 29.1724 139.547 29.0895 139.317 28.925C139.087 28.7605 138.918 28.5238 138.837 28.2525L139.564 28.0709C139.655 28.2525 139.836 28.525 140.109 28.525C140.381 28.525 140.472 28.4342 140.472 28.2525C140.472 28.0709 140.2 27.9801 139.745 27.7984Z" data-inverse=""/>
                    </g>
                    <g className={joinClasses(styles["endfield"], "_0")} mask="url(#endfield-kr-logo-en-square)">
                        <path className={styles["e-1"]} d="M120.369 33.2179H117.758V29.7967H120.369V30.5169H118.659V31.1472H119.919V31.8674H118.659V32.4977H120.369V33.2179Z" data-inverse=""/>
                        <path className={styles["n"]} d="M123.971 33.2179H123.16L121.72 31.1442V33.2179H120.82V29.7967H121.63L123.16 31.7774V29.7967H123.971V33.2179Z" data-inverse=""/>
                        <path className={styles["d-1"]} d="M129.283 33.2179H124.511V29.7966H126.041C126.274 29.7844 126.506 29.8196 126.724 29.9001C126.942 29.9806 127.141 30.1046 127.31 30.2647C127.478 30.4248 127.612 30.6175 127.704 30.8312C127.795 31.0448 127.842 31.2748 127.842 31.5073C127.842 31.7397 127.795 31.9698 127.704 32.1834C127.612 32.397 127.478 32.5898 127.31 32.7499C127.141 32.9099 126.942 33.034 126.724 33.1145C126.506 33.1949 126.274 33.2301 126.041 33.2179" data-inverse=""/>
                        <path className={styles["d-1-inner"]} d="M126.041 30.5169H125.321V32.4977H126.041C126.168 32.4983 126.293 32.4724 126.408 32.4216C126.524 32.3708 126.627 32.2963 126.712 32.203C126.797 32.1096 126.861 31.9994 126.901 31.8795C126.94 31.7597 126.954 31.6329 126.942 31.5073C126.943 31.2595 126.851 31.0203 126.684 30.837C126.518 30.6536 126.288 30.5394 126.041 30.5169Z"/>
                        <path className={styles["f"]} d="M130.453 30.5169H128.922V31.2372H130.183V31.9575H128.922V33.2179H128.112V29.7967H130.543L130.453 30.5169Z" data-inverse=""/>
                        <path className={styles["i"]} d="M131.759 33.2179H130.948V29.7967H131.759V33.2179Z" data-inverse=""/>
                        <path className={styles["e-2"]} d="M134.775 33.2179H132.254V29.7967H134.775V30.5169H133.064V31.1472H134.415V31.8674H133.064V32.4977H134.775V33.2179Z" data-inverse=""/>
                        <path className={styles["l"]} d="M137.746 33.2179H135.315V29.7967H136.125V32.4977H137.746V33.2179Z" data-inverse=""/>
                        <path className={styles["d-2"]} d="M139.546 33.2179H138.016V29.7966H139.546C139.779 29.7844 140.011 29.8196 140.229 29.9001C140.447 29.9806 140.646 30.1046 140.815 30.2647C140.983 30.4248 141.117 30.6175 141.209 30.8312C141.3 31.0448 141.347 31.2748 141.347 31.5073C141.347 31.7397 141.3 31.9698 141.209 32.1834C141.117 32.397 140.983 32.5898 140.815 32.7499C140.646 32.9099 140.447 33.034 140.229 33.1145C140.011 33.1949 139.779 33.2301 139.546 33.2179Z" data-inverse=""/>
                        <path className={styles["d-2-inner"]} d="M139.546 30.5169H138.826V32.4977H139.546C139.673 32.4983 139.798 32.4724 139.913 32.4216C140.029 32.3708 140.132 32.2963 140.217 32.203C140.302 32.1096 140.366 31.9994 140.406 31.8795C140.445 31.7597 140.459 31.6329 140.447 31.5073C140.448 31.2595 140.356 31.0203 140.189 30.837C140.023 30.6536 139.793 30.5394 139.546 30.5169Z"/>
                    </g>
                </g>
            </g>
        </motion.svg>
    );
};