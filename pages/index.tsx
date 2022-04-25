import type { NextPage } from 'next';
import { LogoLarge_EN } from "@components/logo/EN/EN-big";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { InitProgressBar } from "@components/InitProgressBar/InitProgressBar";
import { Footer } from "@components/footer";
import { Header } from '@components/header';
import {IntroLogo} from "@components/logo/IntroLogo";
import { Body } from '@components/body';

const Home: NextPage = () => {
    const [progressPercentage , setProgressPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [logoVisible, setLogoVisible] = useState(false);

    const [isIntroVisible, setIsIntroVisible] = useState(false);

    const router = useRouter();
    const { lang } = router.query;

    const dontAnimate = true;
    useEffect(() => {
        if (lang === undefined)
        {
            router.query.lang = 'en';
            void router.push(router);
        }
        else {
            setTimeout(() => setIsIntroVisible(true), 500);
            setTimeout(() => setIsIntroVisible(false), 3500);
            setTimeout(() => setLogoVisible(true), 4000);
            setTimeout(() => {
                setProgressPercentage(100);
                setTimeout(() => setLogoVisible(false), 1000);
            }, dontAnimate ? 4200 : 9500);
            setTimeout(() => setIsLoading(false), dontAnimate ? 5500 : 11000);
        }

    }, [lang, router]);


    return <div className="rel fw fh flex j-flex-center a-flex-center">
        <AnimatePresence>
            {/*{isLoading && <InitProgressBar progress={progressPercentage}/>}*/}
            {isIntroVisible && <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    duration: 0.5,
                    ease: [0.88,-0.07, 0.22, 1.01]
                }}
                key="intro-logo"
            >
                <IntroLogo/>
            </motion.div>}
            {logoVisible && lang === "en" && <LogoLarge_EN dontAnimateChild={dontAnimate} key="logo-enfield-en"/>}
            {!isLoading && <>
                <Header key="header"/>
                <Body key="body"/>
                <Footer key="footer"/>
            </>}
        </AnimatePresence>
    </div>;
};


export default Home;
