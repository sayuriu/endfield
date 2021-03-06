import { FC, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { SpringOptions } from "popmotion";
import styles from "./InitLoader.module.scss";

export const InitProgressBar: FC<{ progress: number }> = ({ progress }) => {

    const percentage = useAnimatedText(progress, {
        mass: 5,
        stiffness: 1000,
        damping: 100,
        restDelta: 0.0001
    });
    return <motion.div
        className="fw abs b0 l0"
        exit={{ opacity: 0 }}
        transition={{
            duration: .8,
            easings: [0.88,-0.07, 0.22, 1.01],
            delay: 0.8,
        }}
    >
        <motion.h1 className={styles.percentage} ref={percentage}>%</motion.h1>
        <motion.div
            className="fw"
            initial={{ width: 0, height: 8, backgroundColor: '#fff' }}
            animate={{ width: progress + '%' }}
            transition={{
                duration: .3,
                easings: [0.88,-0.07, 0.22, 1.01],
            }}
        >

        </motion.div>
    </motion.div>;
};

function useAnimatedText(target: number, transition: SpringOptions)
{
    const ref = useRef<any>(null);
    const value = useSpring(0, transition);
    useEffect(() => {
        ref.current.innerText = target.toFixed(2);

        return value.onChange((v) => {
            ref.current.innerText = v.toFixed(2);
        });
    });
    useEffect(() => value.set(target), [target]);
    return ref;
}
