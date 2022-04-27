import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import {atom, useAtom} from "jotai";

import { Nullable } from "@utils/common";
import { InitProgressBar } from "@components/InitProgressBar/InitProgressBar";
import { Footer } from "@components/footer";
import { Header } from '@components/header';
import {IntroLogo} from "@components/logo/IntroLogo";
import { Body } from '@components/body';
import { LogoLarge_EN } from "@components/logo/EN/EN-big";
import { LogoLarge_CN } from "@components/logo/CN/CN-big";

interface PageProps {
    lang: Nullable<string>,
    intro: Nullable<string>,
}

function animateSequence(...defs: [() => void, number][]) {
    for (const [fn, delay] of defs)
        setTimeout(fn, delay);
}

function getIntroAnimSpeed(lang: string)
{
    switch (lang) {
        default:
        case 'en':
            return 1.35;
        case 'cn':
            return 1.545;
    }
}

const Home: NextPage<PageProps> = ({ lang, intro }) => {
    const [progressPercentage , setProgressPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [logoVisible, setLogoVisible] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(false);
    const [dontAnimate, setDontAnimate] = useState<Nullable<boolean>>(true);

    const router = useRouter();
    if (!lang && 'lang' in router.query)
        lang = router.query.lang?.toString() ?? null;
    if (!intro && 'intro' in router.query)
        intro = router.query.intro?.toString() ?? null;

    useEffect(() => {
        if (!['en', 'cn'].includes(lang ?? ''))
        {
            router.query.lang = 'en';
            intro ? router.query.intro = intro : null;
            void router.push(router);
            return () => {};
        }

        let animateLogo = true;
        if (intro === 'true')
        {
            if (window)
                document.body.style.setProperty('--anim-playback-rate', getIntroAnimSpeed(lang ?? '').toString());
        }
        else
        {
            let time = localStorage.getItem('endfield-time');
            if (!time)
                localStorage.setItem('endfield-time', new Date().toISOString() + "@first");
            else
            {
                if (time.includes('@first'))
                    localStorage.setItem('endfield-time', time.replace('@first', ''));
                else
                {
                    const timeThen = new Date().getTime();
                    const timeDiff = Date.now() - timeThen;
                    if (timeDiff < 1000 * 60 * 60 * 24)
                        animateLogo = false;
                    else
                        localStorage.setItem('endfield-time', new Date(timeThen + 1000 * 60 * 60 * 24).toISOString());
                }
            }
        }

        setDontAnimate(animateLogo ? null : true);
        animateSequence(
            [() => setIsIntroVisible(true), 500],
            [() => setIsIntroVisible(false), 3500],
            [() => setLogoVisible(true), 4000],
            [() => {
                setProgressPercentage(100);
                setTimeout(() => setLogoVisible(false), 1000);
            }, animateLogo ? 9500 : 4200],
            [() => setIsLoading(false), animateLogo ? 10800 : 5500]
        );
    }, []);

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
            {logoVisible && lang === 'cn' && <LogoLarge_CN dontAnimateChild={dontAnimate} key="logo-enfield-cn"/>}
            {!isLoading && <>
                <Header key="header" lang={lang}/>
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
            intro: context.query.intro ?? null,
        }
    };
}

export default Home;
