import { FC, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import Three from "three";
import styles from "./InitLoader.module.scss";

export const InitProgressBar: FC<{ progress: number, title?: JSX.Element }> = ({ progress, title }) => {
    return <motion.div
        className="fw abs b0 l0"
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            duration: .5,
            easings: [0.88,0, 0.22, 0],
            delay: 0.2,
        }}
    >
        {title}
        <motion.div
            className="fw rel"
            initial={{ width: 0, height: '20px', backgroundColor: '#fff' }}
            animate={{ width: (progress > 100 ? 100 : progress) + '%' }}
            transition={{
                duration: .3,
                easings: [0.88,-0.07, 0.22, 1.01],
            }}
        >

        </motion.div>
    </motion.div>;
};

const prepareCanvas = (canvas: HTMLCanvasElement) => {
};

const ProgressBarBG = () => {
    const canvas = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvas.current)
            prepareCanvas(canvas.current);
    });
    return <motion.canvas ref={canvas}>

    </motion.canvas>;
};
