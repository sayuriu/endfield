import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

import { localGet, Nullable, waitAsync } from "@utils/common";
// import { InitProgressBar } from "@components/InitProgressBar/InitProgressBar";
import { Footer } from "@components/footer";
import { Header } from '@components/header';
import { IntroLogo } from "@components/logo/IntroLogo";
import { Body } from '@components/body';
import { LogoLarge_EN } from "@components/logo/EN/EN-big";
import { LogoLarge_CN } from "@components/logo/CN/CN-big";
import {AvailableLanguages, Language} from "@states/global";

interface PageProps {
    lang: string,
    fullIntro: Nullable<string>,
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

const Home: NextPage<PageProps> = ({ lang, fullIntro }) => {
    // const [progressPercentage , setProgressPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [logoVisible, setLogoVisible] = useState(false);
    const [introVisible, setIntroVisible] = useState(false);
    const [dontAnimate, setDontAnimate] = useState<Nullable<boolean>>(true);

    const [currentLang, setCurrentLang] = useAtom(Language);

    const router = useRouter();
    if (!fullIntro && 'fullIntro' in router.query)
        fullIntro = router.query.fullIntro?.toString() ?? null;

    useEffect(() => {
        if (currentLang !== lang) setCurrentLang(lang);
        if (localGet('fullIntro') === 'true')
            void router.push({
                pathname: '/',
                query: {
                    fullIntro: 'true',
                    lang
                }
            });
        let animateLogo = true;
        if (fullIntro === 'true' || localGet('fullIntro') === 'true')
            document.body.style.setProperty('--anim-playback-rate', getIntroAnimSpeed(lang ?? '').toString());
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
        waitAsync(500).then(() => setIntroVisible(true));
        waitAsync(3500).then(() => setIntroVisible(false));
        waitAsync(4000).then(() => setLogoVisible(true));
        waitAsync(animateLogo ? 9500 : 4200).then(async () => {
            // setProgressPercentage(100);
            await waitAsync(1000);
            setLogoVisible(false);
        });
        waitAsync(animateLogo ? 10800 : 5500).then(() => setIsLoading(false));
    }, []);

    return <div className="rel fw fh flex j-flex-center a-flex-center">
        <AnimatePresence>
            {/*{isLoading && <InitProgressBar progress={progressPercentage}/>}*/}
            {introVisible && <motion.div
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
            {logoVisible && currentLang === 'en' && <LogoLarge_EN dontAnimateChild={dontAnimate} key="logo-enfield-en"/>}
            {logoVisible && currentLang === 'cn' && <LogoLarge_CN dontAnimateChild={dontAnimate} key="logo-enfield-cn"/>}
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
    let lang = 'en';
    if (AvailableLanguages.includes(context.query.lang ?? ''))
        lang = context.query.lang as string;
    return {
        props:{
            lang,
            fullIntro: context.query.fullIntro ?? null,
        }
    };
}

export default Home;
