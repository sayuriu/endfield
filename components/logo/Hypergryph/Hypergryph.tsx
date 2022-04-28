import styles from './Hypergryph.module.scss';
import { FC } from "react";
import {HasAnimation, Logo, Nullable, OverridableStyle} from "@utils/common";
import {motion, MotionProps} from 'framer-motion';
import { Anchor } from "@components/anchor";

export const HypergryphLogo: FC<HasAnimation & OverridableStyle & Logo & HGWoke & MotionProps & { link?: boolean }> = ({ overrideStyles, dontAnimateChild= null, noLogoText, woke, link, ...animProps }) => {
    const children = (<>
        <rect width="173" height="60" fill="transparent"/>
        {woke && <rect width={5} height={6} x={10} y={40} fill="#000"/>}
        <path
            id={styles["hg"]}
            d={ woke ?
                "M4.9 31.4L6.4 35.6L6.6 34.2L6.4 28.3L6.8 26.3L5.8 22.9L0 18.5L4.1 22.4V23L5.1 25.9L4.2 30.6L4.9 31.4ZM7.9 8V13.1L7.7 14.2L8.2 15.2L8.9 17.8L9.5 18.4L8.3 8L7.3 5.8V6.2L7.9 8ZM28.9 15.3L25.2 22.4L25.8 21.8L29.7 18.4L30.2 18L31 16.8L32.1 10.3L30.9 8.1L29.6 4.9L26.7 0L29.1 5.4L30.5 9.7L29.3 14.7L28.9 15.3ZM32.6 43.9L28.1 43.1L26.5 43.4L25.5 44.1L23.7 44.5L18.3 46.2H21.3L24.3 46.9V47.5L26 51.2L29.2 46.9L29.7 46L30.4 46.2L35.6 47.7L33.2 45.7L32.5 45.3L36 44.5L32.6 43.9ZM41.4 2.3V1.7L38.1 8.9L36.9 11.4L30.4 18.4L25.2 22.8L20.3 25.6L18.9 29.9L19.7 25.5L18.1 21.6L17.3 21L13 16.4L16.6 21.4L17.9 25.1L17.2 28.2L16.9 28.9L14.3 31.6L11.9 33.2L11.2 34.1L10.8 32.6L11 30.5L11.2 30.1L10.1 28L9.5 24.1L9.2 19L8.8 18.4L7.9 15.3L6 10.9L3.2 5.8V6.5L4.9 9.9L6.9 16.5L7.2 18.5L7.4 20V25L6.8 28.5V34.9L6.2 40.3L5.8 41.9L6.5 43.6L5.8 48.8V49.2L5 50.1L4.7 53.2V59.2H5L6.3 57L9.9 51.9L10.6 51.4L10.8 51.2L14.5 50L14.8 49.3L18.5 47.3L19.1 46.8L17.4 46.3L23.3 44.3L25.4 43.7L26.3 43L29.6 42.3L34.4 43.1H34.9L31.2 41.4L30.7 40.9L23.7 37.8H23.1L22.2 38L23 37.6L29.2 37L30.3 36H29.5L22.1 33.7L20.7 35.3L21 34.6L23.2 31L23.7 29L32.1 20.7L36.4 15L38.7 10L41.4 2.3ZM13.9 42.7L12.3 45L12 45.2L12.5 43.3L14 40.2L13.9 42.7Z" :
                "M4.9 31.4L6.4 35.6L6.6 34.2L6.4 28.3L6.8 26.3L5.8 22.9L0 18.5L4.1 22.4V23L5.1 25.9L4.2 30.6L4.9 31.4ZM7.9 8V13.1L7.7 14.2L8.2 15.2L8.9 17.8L9.5 18.4L8.3 8L7.3 5.8V6.2L7.9 8ZM28.9 15.3L25.2 22.4L25.8 21.8L29.7 18.4L30.2 18L31 16.8L32.1 10.3L30.9 8.1L29.6 4.9L26.7 0L29.1 5.4L30.5 9.7L29.3 14.7L28.9 15.3ZM32.6 43.9L28.1 43.1L26.5 43.4L25.5 44.1L23.7 44.5L18.3 46.2H21.3L24.3 46.9V47.5L26 51.2L29.2 46.9L29.7 46L30.4 46.2L35.6 47.7L33.2 45.7L32.5 45.3L36 44.5L32.6 43.9ZM41.4 2.3V1.7L38.1 8.9L36.9 11.4L30.4 18.4L25.2 22.8L20.3 25.6L18.9 29.9L19.7 25.5L18.1 21.6L17.3 21L13 16.4L16.6 21.4L17.9 25.1L17.2 28.2L16.9 28.9L14.3 31.6L11.9 33.2L11.2 34.1L10.8 32.6L11 30.5L11.2 30.1L10.1 28L9.5 24.1L9.2 19L8.8 18.4L7.9 15.3L6 10.9L3.2 5.8V6.5L4.9 9.9L6.9 16.5L7.2 18.5L7.4 20V25L6.8 28.5V34.9L6.2 40.3L5.8 41.9L6.5 43.6L5.8 48.8V49.2L5 50.1L4.7 53.2V59.2H5L6.3 57L9.9 51.9L10.6 51.4L10.8 51.2L14.5 50L14.8 49.3L18.5 47.3L19.1 46.8L17.4 46.3L23.3 44.3L25.4 43.7L26.3 43L29.6 42.3L34.4 43.1H34.9L31.2 41.4L30.7 40.9L23.7 37.8H23.1L22.2 38L23 37.6L29.2 37L30.3 36H29.5L22.1 33.7L20.7 35.3L21 34.6L23.2 31L23.7 29L32.1 20.7L36.4 15L38.7 10L41.4 2.3ZM13.9 42.7L12.3 45L12 45.2L13.786 42.744L14 40.2L13.9 42.7Z"
            }
        />
        {!noLogoText && <>
            <path id={styles["hg-txt"]} d="M48 30.6008H45.3L46.8 22.3008H41.7L38 43.2008H43.1L44.7 34.3008H47.3L45.7 43.2008H50.9L54.5 22.3008H49.4L48 30.6008ZM62.7 22.3008L60.3 27.9008L59.6 22.3008H54.8L56.5 34.3008L54.9 43.2008H59.9L61.4 34.3008L67.3 22.3008H62.7ZM70.4 34.6008H74.1C74.726 34.4918 75.333 34.2888 75.9 34.0008C76.499 33.7868 77.045 33.4458 77.5 33.0008C78.054 32.5188 78.468 31.8978 78.7 31.2008C79.144 30.3988 79.417 29.5138 79.5 28.6008C79.9 26.6008 79.7 25.1008 78.9 24.0008C77.946 22.8538 76.485 22.2548 75 22.4008H67.4L63.8 43.2008H68.9L70.4 34.6008ZM71.9 25.9008H73.5L74.3 26.1008L74.7 26.4008C74.8 26.6008 74.8 26.8008 74.9 27.0008V27.7008C74.852 27.9318 74.819 28.1658 74.8 28.4008C74.694 29.1058 74.456 29.7838 74.1 30.4008C73.775 30.8478 73.253 31.1088 72.7 31.1008H71L71.9 25.9008ZM87.5 43.2008L88.1 39.8008H83.4L84.4 34.0008H87.9L88.5 30.4008H85L85.8 25.8008H90.5L91.1 22.3008H81.3L77.6 43.2008H87.5ZM93.1 43.2008L94.7 34.0008H95.8L96.3 43.2008H101.7L100.6 33.2008C101.58 32.7848 102.415 32.0898 103 31.2008C103.588 30.1518 103.962 28.9958 104.1 27.8008C104.281 27.0478 104.315 26.2668 104.2 25.5008C104.048 24.9668 103.812 24.4598 103.5 24.0008C103.173 23.5058 102.674 23.1498 102.1 23.0008C101.499 22.7288 100.857 22.5598 100.2 22.5008L97.9 22.3008H91.6L88 43.2008H93.1ZM96.2 25.7008H97.8C98.366 25.6268 98.92 25.9038 99.2 26.4008C99.394 27.0498 99.428 27.7358 99.3 28.4008C99.163 29.1598 98.855 29.8778 98.4 30.5008C97.887 30.9808 97.202 31.2338 96.5 31.2008H95.2L96.2 25.7008ZM103.3 39.2008C103.302 39.9938 103.472 40.7778 103.8 41.5008C104.116 42.1908 104.691 42.7298 105.4 43.0008C106.242 43.3978 107.172 43.5698 108.1 43.5008C109.524 43.5338 110.872 42.8598 111.7 41.7008V43.2008H115.2L117.1 32.2008H110.8L110.3 35.2008H112L111.5 37.9008L111.2 38.8008C111.091 39.1248 110.88 39.4048 110.6 39.6008C110.34 39.8728 109.975 40.0188 109.6 40.0008L108.9 39.8008L108.6 39.3008C108.518 39.0768 108.484 38.8388 108.5 38.6008C108.491 38.3638 108.525 38.1268 108.6 37.9008L110.3 27.7008C110.3 27.4008 110.4 27.1008 110.4 26.9008L110.7 26.3008C110.8 26.0008 111 25.9008 111.2 25.7008L111.9 25.5008C112.115 25.5068 112.324 25.5768 112.5 25.7008L112.8 26.0008C112.895 26.1488 112.931 26.3278 112.9 26.5008V27.1008C112.857 27.2658 112.823 27.4328 112.8 27.6008L112.4 29.6008H117.5L117.7 28.1008C117.856 27.4798 117.923 26.8408 117.9 26.2008C117.922 25.6088 117.784 25.0208 117.5 24.5008C117.349 23.9818 117.033 23.5258 116.6 23.2008C116.156 22.7638 115.604 22.4528 115 22.3008C114.184 22.0908 113.343 21.9898 112.5 22.0008C111.414 22.0038 110.335 22.1728 109.3 22.5008C108.479 22.8578 107.732 23.3668 107.1 24.0008C106.487 24.6868 105.981 25.4628 105.6 26.3008C105.154 27.2508 104.851 28.2618 104.7 29.3008L103.5 36.3008C103.294 37.2528 103.226 38.2298 103.3 39.2008ZM131.4 31.2008C131.945 30.1328 132.316 28.9858 132.5 27.8008C132.651 27.0418 132.651 26.2598 132.5 25.5008C132.423 24.9598 132.218 24.4458 131.9 24.0008C131.55 23.5288 131.06 23.1788 130.5 23.0008C129.899 22.7288 129.257 22.5598 128.6 22.5008L126.3 22.3008H120L116.3 43.2008H121.5L123.1 34.0008H124.2L124.7 43.2008H130.1L129 33.2008C129.98 32.7848 130.815 32.0898 131.4 31.2008ZM127.7 28.4008C127.563 29.1598 127.255 29.8778 126.8 30.5008C126.287 30.9808 125.602 31.2338 124.9 31.2008H123.6L124.6 25.7008H126.2C126.766 25.6268 127.32 25.9038 127.6 26.4008C127.794 27.0498 127.828 27.7358 127.7 28.4008ZM141.1 22.3008L138.8 27.9008L138.1 22.3008H133.3L135 34.3008L133.4 43.2008H138.3L139.9 34.3008L145.8 22.3008H141.1ZM158 28.5008C158.363 26.9458 158.15 25.3108 157.4 23.9008C156.425 22.7818 154.98 22.1888 153.5 22.3008H145.9L142.2 43.2008H147.3L148.9 34.6008H152.6C153.226 34.4918 153.833 34.2888 154.4 34.0008C154.988 33.7638 155.529 33.4258 156 33.0008C156.491 32.4668 156.896 31.8598 157.2 31.2008C157.554 30.3638 157.822 29.4928 158 28.6008V28.5008ZM153.2 28.5008C153.118 29.1978 152.915 29.8748 152.6 30.5008C152.243 30.9638 151.684 31.2248 151.1 31.2008H149.5L150.4 26.0008H152L152.7 26.2008C152.9 26.3008 153.1 26.4008 153.1 26.5008C153.212 26.6828 153.28 26.8878 153.3 27.1008V27.8008C153.303 28.0378 153.269 28.2738 153.2 28.5008ZM167.6 22.4008L166.2 30.7008H163.6L165 22.4008H159.9L156.2 43.3008H161.3L162.9 34.4008H165.5L163.9 43.3008H169.1L172.7 22.4008H167.6Z"/>
            <path id={styles["network-tech"]} d="M72.1 47.2L71.7 49.6L70.5 47.2H69.7L69 51.7H70L70.4 49.3L71.6 51.7H72.3L73 47.2H72.1ZM74.6 48.4C73.644 48.399 72.819 49.132 72.766 50.087C72.485 50.952 73.191 51.844 74.1 51.8C74.675 51.782 75.217 51.529 75.6 51.1L74.9 50.7L74.3 50.9C74.006 50.928 73.725 50.768 73.6 50.5H75.8C75.8 50.3 75.9 50.2 75.9 50.1C76.181 49.235 75.509 48.356 74.6 48.4ZM73.7 49.8C73.797 49.452 74.144 49.235 74.5 49.3C74.8 49.3 75 49.4 75 49.8H73.7ZM81.6 48.5L80.9 50.2L80.7 48.5H79.9L79.1 50.2L78.9 48.5H77.5V47.6L76.5 47.9V48.5H76.1L75.9 49.4H76.4L76.2 50.5C76.1 51.4 76.3 51.8 77.5 51.7L77.7 50.8C77.3 50.8 77.1 50.8 77.1 50.5L77.3 49.4H77.9V48.8L78.3 51.7H79.2L79.9 50L80.1 51.7H81L82.5 48.5H81.6ZM84 48.4C83.044 48.399 82.341 49.153 82.177 50.094C82.038 50.996 82.591 51.844 83.5 51.8C84.444 51.727 85.222 51.03 85.4 50.1C85.595 49.213 84.907 48.379 84 48.4ZM83.6 50.8C83.222 50.832 83.018 50.473 83.066 50.097C83.16 49.664 83.458 49.3 83.9 49.3C84.3 49.3 84.5 49.6 84.4 50.1C84.349 50.502 84.006 50.803 83.6 50.8ZM87.4 49.5L87.6 48.4C87.146 48.379 86.736 48.667 86.6 49.1V48.5H85.7L85.2 51.7H86.1L86.4 50.2C86.446 49.708 86.922 49.374 87.4 49.5ZM89.4 48.5L88.3 49.9L88.8 47.2H87.9L87.1 51.7H88L88.2 50.3L89 51.7H90L89.1 50.1L90.5 48.5H89.4ZM94.7 47.2H91.6L91.4 48.2H92.5L91.9 51.7H92.9L93.5 48.2H94.6L94.7 47.2ZM99.4 50.5C99.223 50.699 98.966 50.809 98.7 50.8C98.322 50.832 98.047 50.448 98.2 50.1C98.2 49.658 98.558 49.3 99 49.3C99.221 49.345 99.408 49.494 99.5 49.7L100.4 49.2C100.185 48.68 99.661 48.357 99.1 48.4C98.144 48.399 97.353 49.145 97.3 50.1C97.4 49.1 96.9 48.4 96 48.4C95.041 48.437 94.243 49.151 94.1 50.1C93.905 50.987 94.593 51.821 95.5 51.8C96.053 51.808 96.575 51.547 96.9 51.1L96.3 50.7L95.7 50.9C95.3 50.9 95.1 50.8 95 50.5H97.2C97.2 50.3 97.2 50.2 97.3 50.1C97.019 50.965 97.691 51.844 98.6 51.8C99.212 51.746 99.765 51.414 100.1 50.9L99.4 50.5ZM95.1 49.8C95.197 49.452 95.544 49.235 95.9 49.3C96.176 49.3 96.4 49.524 96.4 49.8H95.1ZM102.3 48.4C101.959 48.41 101.636 48.554 101.4 48.8L101.6 47.2H100.7L100 51.7H100.9L101.2 49.9C101.25 49.553 101.549 49.296 101.9 49.3C102.2 49.3 102.4 49.5 102.3 49.9L102 51.7H102.9L103.2 49.7C103.397 49.077 102.953 48.435 102.3 48.4ZM105.5 48.4C105.129 48.405 104.772 48.547 104.5 48.8V48.5H103.6L103.1 51.7H104L104.2 49.9C104.25 49.553 104.549 49.296 104.9 49.3C105.2 49.3 105.4 49.5 105.3 49.9L105 51.7H105.9L106.3 49.7C106.4 48.9 106 48.4 105.4 48.4H105.5ZM108.2 48.4C107.241 48.437 106.443 49.151 106.3 50.1C106.113 50.947 106.734 51.758 107.6 51.8C108.559 51.763 109.357 51.049 109.5 50.1C109.781 49.235 109.109 48.356 108.2 48.4ZM107.8 50.8C107.4 50.8 107.2 50.5 107.2 50.1C107.245 49.678 107.578 49.345 108 49.3C108.429 49.275 108.744 49.695 108.6 50.1C108.549 50.502 108.206 50.803 107.8 50.8ZM110.2 47L109.4 51.7H110.3L111.1 47H110.2ZM112.6 48.4C111.641 48.437 110.843 49.151 110.7 50.1C110.513 50.947 111.134 51.758 112 51.8C112.959 51.763 113.757 51.049 113.9 50.1C114.181 49.235 113.509 48.356 112.6 48.4ZM112.2 50.8C111.8 50.8 111.6 50.5 111.6 50.1C111.651 49.642 112.04 49.297 112.5 49.3C112.8 49.3 113.1 49.6 113 50.1C112.949 50.502 112.606 50.803 112.2 50.8ZM118.7 50.4L118.4 48.5H116.6V48.8C116.411 48.548 116.115 48.4 115.8 48.4C114.895 48.436 114.142 49.106 114 50C113.811 50.791 114.387 51.56 115.2 51.6C115.578 51.632 115.949 51.484 116.2 51.2V51.5C116.149 51.902 115.806 52.203 115.4 52.2C115.106 52.228 114.825 52.068 114.7 51.8L113.9 52.3C114.146 52.781 114.663 53.059 115.2 53C116.104 53.059 116.895 52.4 117 51.5L117.5 48.6L118.2 51.5C118 51.9 117.8 52.1 117.4 52.1L117.2 53C118.088 52.98 118.877 52.428 119.2 51.6L120.7 48.5H119.7L118.7 50.4ZM115.4 50.8C115 50.8 114.8 50.5 114.8 50C114.925 49.602 115.283 49.323 115.7 49.3C116.075 49.295 116.362 49.63 116.3 50C116.249 50.458 115.86 50.803 115.4 50.8ZM123.4 50.8C122.643 50.865 122.093 50.095 122.4 49.4C122.495 48.687 123.082 48.142 123.8 48.1C124.21 48.036 124.601 48.297 124.7 48.7L125.6 48.2C125.408 47.491 124.731 47.025 124 47.1C122.69 47.134 121.594 48.104 121.4 49.4C121.2 50.8 121.9 51.8 123.2 51.8C124.01 51.794 124.762 51.381 125.2 50.7L124.5 50.2C124.248 50.562 123.841 50.784 123.4 50.8ZM127.2 48.4C126.224 48.395 125.403 49.129 125.3 50.1C125.019 50.965 125.691 51.844 126.6 51.8C127.544 51.727 128.322 51.03 128.5 50.1C128.687 49.253 128.066 48.442 127.2 48.4ZM126.8 50.8C126.425 50.805 126.138 50.47 126.2 50.1C126.3 49.6 126.6 49.3 127 49.3C127.429 49.275 127.744 49.695 127.6 50.1C127.514 50.483 127.191 50.766 126.8 50.8ZM129.1 50.6C128.749 50.596 128.45 50.853 128.4 51.2C128.336 51.514 128.58 51.806 128.9 51.8C129.231 51.8 129.5 51.531 129.5 51.2C129.6 50.8 129.4 50.6 129.1 50.6ZM129.5 52.6H130.2L131 50.7H130L129.5 52.6ZM134 47.2H133L132.3 51.7H134.7L134.9 50.7H133.4L134 47.2ZM136.3 49.4H136.9L137.1 48.5H136.4L136.6 47.6L135.6 47.9V48.5H135.2L135 49.4H135.5L135.3 50.5C135.1 51.4 135.4 51.8 136.6 51.7L136.8 50.8C136.4 50.8 136.113 50.788 136.113 50.488L136.3 49.4ZM139.8 47.2L139.5 48.8C139.4 48.5 139.1 48.4 138.7 48.4C137.782 48.45 137.05 49.182 137 50.1C136.74 50.888 137.275 51.714 138.1 51.8C138.466 51.772 138.815 51.632 139.1 51.4V51.7H140L140.8 47.2H139.8ZM139.3 50.1C139.249 50.558 138.86 50.903 138.4 50.9C138 50.9 137.8 50.6 137.9 50.1C137.9 49.658 138.258 49.3 138.7 49.3C139.129 49.275 139.444 49.695 139.3 50.1ZM140.9 50.6C140.569 50.6 140.3 50.869 140.3 51.2C140.143 51.465 140.332 51.8 140.64 51.804C140.66 51.804 140.68 51.803 140.7 51.8C141 51.8 141.4 51.5 141.4 51.2C141.4 50.9 141.3 50.6 140.9 50.6Z"/>
        </>}
    </>);
    return (
        <motion.svg
            className={styles.HGLogo}
            data-noanim={dontAnimateChild ? dontAnimateChild : null}
            style={overrideStyles}
            viewBox={noLogoText ? "0 0 42 60" : "0 0 173 60"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...animProps}
        >
            {link ?
                <Anchor to="https://hypergryph.com">{children}</Anchor> :
                <>{children}</>
            }
        </motion.svg>
    );
};

interface HGWoke {
    woke?: Nullable<boolean>;
}
