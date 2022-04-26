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
import {Nullable} from "@utils/common";

interface PageProps {
    lang: Nullable<string>,
    animateAgain: Nullable<string>,
}

const Home: NextPage<PageProps> = ({ lang, animateAgain }) => {
    const [progressPercentage , setProgressPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [logoVisible, setLogoVisible] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(false);
    const [dontAnimate, setDontAnimate] = useState<Nullable<boolean>>(null);

    const router = useRouter();
    if (!lang && 'lang' in router.query)
        lang = router.query.lang?.toString() ?? null;
    if (!animateAgain && 'animateAgain' in router.query)
        animateAgain = router.query.animateAgain?.toString() ?? null;

    useEffect(() => {
        if (!['en'].includes(lang ?? ''))
        {
            router.query.lang = 'en';
            void router.push(router);
            return () => {};
        }

        if (animateAgain === 'true')
            setDontAnimate(null);
        else
        {
            let time = localStorage.getItem('endfield-time');
            if (!time)
            {
                time = new Date().toISOString();
                localStorage.setItem('endfield-time', time);
            }
            else
            {
                const timeThen = new Date(time).getTime();
                const timeDiff = Date.now() - timeThen;
                if (timeDiff < 1000 * 60 * 60 * 24)
                    setDontAnimate(true);
                else
                    localStorage.setItem('endfield-time', new Date(timeThen + 1000 * 60 * 60 * 24).toISOString());
            }
        }

        setTimeout(() => setIsIntroVisible(true), 500);
        setTimeout(() => setIsIntroVisible(false), 3500);
        setTimeout(() => setLogoVisible(true), 4000);
        setTimeout(() => {
            setProgressPercentage(100);
            setTimeout(() => setLogoVisible(false), 1000);
        }, dontAnimate ? 4200 : 9500);
        setTimeout(() => setIsLoading(false), dontAnimate ? 5500 : 11000);
    }, [lang, animateAgain, dontAnimate, router]);

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
            {logoVisible && lang === 'en' && <LogoLarge_EN dontAnimateChild={dontAnimate} key="logo-enfield-en"/>}
            {!isLoading && <>
                <Header key="header"/>
                <Body key="body"/>
                <Footer key="footer"/>
            </>}
        </AnimatePresence>
    </div>;
};

export async function getServerSideProps(context: { query: Record<string, string | undefined> })
{
    return {
        props:{
            lang: context.query.lang ?? null,
            animateAgain: context.query.animateAgain ?? null,
        }
    };
}

export default Home;
