import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

import { AvailableLanguages, ImageData, Language } from "@states/global";
import { AssetLoader } from "@utils/loader";
import { findNearestMultiple, localGet, localSet, Nullable, waitAsync } from "@utils/common";
import { Footer } from "@components/footer";
import { Header } from '@components/header';
import { IntroLogo } from "@components/logo/IntroLogo";
import { Body } from '@components/body';
import { LogoLarge_EN } from "@components/logo/EN/EN-big";
import { LogoLarge_CN } from "@components/logo/CN/CN-big";
import { LogoLarge_JP } from "@components/logo/JP/JP-big";

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
        case 'jp':
            return 2.3;
    }
}


const Home: NextPage<PageProps> = ({ lang, fullIntro }) => {
    const [progressPercentage , setProgressPercentage] = useState(0);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [logoVisible, setLogoVisible] = useState(false);
    const [introVisible, setIntroVisible] = useState(false);
    const [introFinished, setIntroFinished] = useState(false);
    const [dontAnimate, setDontAnimate] = useState<Nullable<boolean>>(true);

    const [currentLang, setCurrentLang] = useAtom(Language);
    const [, setImageData] = useAtom(ImageData);

    const loadDependencies = new Array(8)
        .fill(0)
        .map((_, i) => ({ url: `img/0${i + 1}_HD.jpg`, overrideOption: { mimeType: 'image/jpeg' } }));

    const [progressData, setProgressData] = useState({
        total: loadDependencies.length,
        loaded: 0,
        success: 0,
        _lastPercentage: 0,
    });

    const router = useRouter();
    if (!fullIntro && 'fullIntro' in router.query)
        fullIntro = router.query.fullIntro?.toString() ?? null;

    useEffect(() => {
        if (currentLang !== lang) setCurrentLang(lang);
        if (localGet('fullIntro') === 'true' && fullIntro === null)
            void router.push({
                pathname: '/',
                query: {
                    fullIntro: 'true',
                    lang
                }
            });
        let animateLogo = true;
        if (fullIntro === 'true' || (fullIntro === null && localGet('fullIntro') === 'true'))
            document.body.style.setProperty('--anim-playback-rate', getIntroAnimSpeed(lang ?? '').toString());
        else
        {
            let time = localGet('endfield-time');
            if (!time)
                localSet('endfield-time', new Date().toISOString() + "@first");
            else
            {
                if (time.includes('@first'))
                    localSet('endfield-time', time.replace('@first', ''));
                else
                {
                    const timeThen = new Date().getTime();
                    const timeDiff = Date.now() - timeThen;
                    if (timeDiff < 1000 * 60 * 60 * 24)
                        animateLogo = false;
                    else
                        localSet('endfield-time', new Date(timeThen + 1000 * 60 * 60 * 24).toISOString());
                }
            }
        }

        setDontAnimate(animateLogo ? null : true);
        (async () => {
            const loader = new AssetLoader(
                loadDependencies,
                {
                    responseType: 'arraybuffer',
                    onProgressUpdate: (v, requests) => {
                        const percentage = Math.floor(v * 100);
                        setProgressData(prev => {
                            if (percentage >= findNearestMultiple(100 / requests.length, prev._lastPercentage)) {
                                let success = 0, loaded = 0;
                                for (const request of requests)
                                {
                                    if (request.success)
                                    {
                                        success++;
                                        continue;
                                    }
                                    if (request.progress === 1)
                                        loaded++;
                                }
                                return {
                                    total: requests.length,
                                    loaded: loaded + success,
                                    success,
                                    _lastPercentage: percentage
                                };
                            }
                            return prev;
                        });
                        setProgressPercentage(percentage);
                    }
                }
            );
            loader.await().then(resolved => {
                setProgressPercentage(100);
                const imageData = new Map<string, string>(
                    resolved.map(({ url, resolved: data }) => [
                        url,
                        !!data ?
                            URL.createObjectURL(new Blob([data as Blob]))
                            : 'null'
                    ]));
                setImageData(imageData);
                waitAsync(500).then(() => setProgressPercentage(() => 101));
            });
            await waitAsync(500).then(() =>  setIntroVisible(() => true));
            await waitAsync(3000).then(() => setIntroVisible(() => false));
            await waitAsync(500).then(() => {
                setLogoVisible(() => true);
                setIntroFinished(() => true);
            });
            await waitAsync(animateLogo ? 6500 : 1200)
                .then(() => setLogoVisible(() => false));
            await waitAsync(500)
                .then(() => setFinishedLoading(() => true));
        })();
    }, []);

    return <div className="rel fw fh flex j-flex-center a-flex-center">
        <AnimatePresence>
            {
                (progressPercentage !== 101) &&
                <motion.div
                    className="fw abs b0 l0"
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: .5,
                        easings: [0.88,0, 0.22, 0],
                        delay: 0.2,
                    }}
                >
                    <Box as={"h1"} fontFamily={"Jetbrains Mono"} color={"#eee"}>
                        {progressPercentage >= 100 ?
                            'Ready.' :
                            (({ loaded, success }) => <>
                                {progressPercentage}%&nbsp;
                                <Box as={"span"} color={"#777"}>Loading {loaded} / {loadDependencies.length}</Box>
                                { loaded !== success && <Box as={"span"} color={"#777"}>&nbsp;({loaded - success} failed)</Box> }
                            </>)(progressData)
                        }
                    </Box>
                    <motion.div
                        className="fw rel"
                        initial={{ width: 0, height: '20px', backgroundColor: '#fff' }}
                        animate={{ width: (progressPercentage > 100 ? 100 : progressPercentage) + '%' }}
                        transition={{
                            duration: .3,
                            easings: [0.88,-0.07, 0.22, 1.01],
                        }}
                    >

                    </motion.div>
                </motion.div>
            }
            {introVisible && <IntroLogo key="intro-logo"/>}
            { currentLang === 'en' && ((logoVisible || progressPercentage < 100) && introFinished) && <LogoLarge_EN dontAnimateChild={dontAnimate} key="logo-enfield-en"/>}
            { currentLang === 'cn' && ((logoVisible || progressPercentage < 100) && introFinished) && <LogoLarge_CN dontAnimateChild={dontAnimate} key="logo-enfield-cn"/>}
            { currentLang === 'jp' && ((logoVisible || progressPercentage < 100) && introFinished) && <LogoLarge_JP dontAnimateChild={dontAnimate} key="logo-enfield-jp"/>}
            {/*kr <Component "LogoLargeKR" @child>*/}
        </AnimatePresence>
        {finishedLoading && progressPercentage === 101 && <>
            <Body key="body"/>
            <Footer key="footer"/>
            <Header key="header"/>
        </>}
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
