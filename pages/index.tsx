import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { FC, useEffect, useMemo, useReducer, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

import { AvailableLanguages, ImageData, Language } from "@states/global";
import { AssetLoader, RequestData } from "@utils/loader";
import { findNextMultiple, localGet, localSet, Nullable, waitAsync } from "@utils/common";
import { Footer } from "@components/footer";
import { Header } from '@components/header';
import { IntroLogo } from "@components/logo/IntroLogo";
import { Body } from '@components/body';
import { LogoLarge_EN } from "@components/logo/EN/EN-big";
import { LogoLarge_CN } from "@components/logo/CN/CN-big";
import { LogoLarge_JP } from "@components/logo/JP/JP-big";
import { MotionBox } from "@components/chakra-motion";

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


interface IInitProgressBarProps {
    loaded: number;
    total: number;
    success: number;
    percentage: number;
}
const InitProgressBar: FC<IInitProgressBarProps> = ({ loaded, total, success, percentage }) => {
    useEffect(() => {}, []);
    return <>
        {
            <motion.div
                className="fw abs b0 l0"
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: .5,
                    easings: [0.88, 0, 0.22, 0],
                    delay: 0.2,
                }}
            >
                <MotionBox
                    fontFamily={"Jetbrains Mono"}
                    color={"#fff"}
                >
                    {
                        percentage === 100 ?
                            'Ready.' :
                            <span>
                                {percentage}% Loaded&nbsp;
                                <span color={"#555"}>
                                    {loaded}/{total}
                                    {success !== total && <>({success} success, {loaded - success} failed)</>}
                                </span>
                            </span>
                    }
                </MotionBox>
                <motion.div
                    className="fw rel"
                    initial={{ width: 0, height: "20px", backgroundColor: "#fff" }}
                    animate={{ width: (percentage > 100 ? 100 : percentage) + "%" }}
                    transition={{
                        duration: .3,
                        easings: [0.88, -0.07, 0.22, 1.01],
                    }}
                >
                </motion.div>
            </motion.div>
        }
    </>;
};

const Home: NextPage<PageProps> = ({ lang, fullIntro }) => {
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [logoVisible, setLogoVisible] = useState(false);
    const [introVisible, setIntroVisible] = useState(false);
    const [introFinished, setIntroFinished] = useState(false);
    const [dontAnimate, setDontAnimate] = useState<Nullable<boolean>>(true);

    const [currentLang, setCurrentLang] = useAtom(Language);
    const [, setImageData] = useAtom(ImageData);

    const loadDependencies = useMemo(
        () => new Array(8)
                .fill(0)
                .map((_, i) => ({ url: `img/0${i + 1}_HD.jpg`, overrideOption: { mimeType: 'image/jpeg' } }))
    , []);
    const [progressData, setProgressData] = useState({
        percentage: 0,
        loaded: 0,
        total: loadDependencies.length,
        success: 0,
    });

    const progressData2 = useReducer((prevState: IInitProgressBarProps, payload: IInitProgressBarProps) => {
        return {...prevState, payload };
    }, {
        percentage: 0,
        loaded: 0,
        total: loadDependencies.length,
        success: 0,
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
                    onProgressUpdate: (v) => {
                        const percentage = Math.floor(v * 100);
                        setProgressData(prev => {
                            let
                                success = prev.success,
                                loaded = prev.loaded;
                            if (percentage >= findNextMultiple(100 / loadDependencies.length, prev.percentage)) {
                                success = 0;
                                loaded = 0;
                                for (const request of loader.requests)
                                {
                                    if (request.progress === 1)
                                        loaded++;
                                    if (request.success)
                                        success++;
                                }
                            }
                            return {
                                total: prev.total,
                                loaded,
                                percentage,
                                success,
                            };
                        });
                    }
                }
            );
            loader.await().then(resolved => {
                setProgressData(prev => ({ ...prev, ...{ percentage: 100 } }));
                const imageData = new Map<string, string>(
                    resolved.map(({ url, resolved: data }) => [
                        url,
                        !!data ?
                            URL.createObjectURL(new Blob([data as Blob]))
                            : 'null'
                    ]));
                setImageData(imageData);
                waitAsync(500).then(() => setProgressData(prev => ({ ...prev, ...{ percentage: 101 } })));
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
            {progressData.percentage !== 101 && <InitProgressBar {...progressData} key="init-progress-bar"/>}
            {introVisible && <IntroLogo key="intro-logo"/>}
            {currentLang === 'en' && ((logoVisible || progressData.percentage < 101) && introFinished) &&
                <LogoLarge_EN dontAnimateChild={dontAnimate} key="logo-enfield-en"/>}
            {currentLang === 'cn' && ((logoVisible || progressData.percentage < 101) && introFinished) &&
                <LogoLarge_CN dontAnimateChild={dontAnimate} key="logo-enfield-cn"/>}
            {currentLang === 'jp' && ((logoVisible || progressData.percentage < 101) && introFinished) &&
                <LogoLarge_JP dontAnimateChild={dontAnimate} key="logo-enfield-jp"/>}
            {/*kr <Component "LogoLargeKR" @child>*/}
        </AnimatePresence>
        {finishedLoading && progressData.percentage === 101 && <>
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
