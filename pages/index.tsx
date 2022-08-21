import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";

import { AvailableLanguages, ImageData, Language, LanguagePack } from "@states/global";
import { AssetLoader } from "@utils/loader";
import { findNearestMultiple, LanguagePack as _LanguagePack, localGet, localSet, Nullable, useLocale, waitAsync } from "@utils/common";
import { Footer } from "@components/footer";
import { Header } from '@components/header';
import { IntroLogo } from "@components/logo/IntroLogo";
import { Body } from '@components/body';
import { LogoLarge_EN } from "@components/logo/EN/EN-big";
import { LogoLarge_CN } from "@components/logo/CN/CN-big.v2";
import { LogoLarge_JP } from "@components/logo/JP/JP-big";
import { LogoLarge_KR } from "@components/logo/KR/KR-big";
import { MotionBox, MotionFlex } from '@components/chakra-motion';

interface PageProps {
    lang: string,
    langPack: string,
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
        case 'kr':
            return 1.8;
    }
}

function getPostIntroAnimSpeed(lang: string)
{
    switch (lang) {
        default:
            return null;
        case 'kr':
            return 1.5;
    }
}

const Home: NextPage<PageProps> = ({ lang, fullIntro, langPack }) => {
    const [progressPercentage , setProgressPercentage] = useState(0);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [logoVisible, setLogoVisible] = useState(false);
    const [introVisible, setIntroVisible] = useState(false);
    const [introFinished, setIntroFinished] = useState(false);
    const [dontAnimate, setDontAnimate] = useState<Nullable<boolean>>(true);

    const initalLangPack: Partial<_LanguagePack> = { [lang]: JSON.parse(langPack) };
    const [currentLang, setCurrentLang] = useAtom(Language);
    const [, setLangPack] = useAtom(LanguagePack);
    const [, setImageData] = useAtom(ImageData);
    const locale = useLocale(useAtom(Language)[0], initalLangPack);

    const loadDependencies = [
        ...new Array(8)
            .fill(0)
            .map((_, i) => ({ url: `assets/img/0${i + 1}_HD.jpg`, overrideOptions: { mimeType: 'image/jpeg' } })),
        ...AvailableLanguages
            .filter(l => l !== lang)
            .map(l => ({ url: `assets/lang/${l}.json`, overrideOptions: { responseType: 'json', mimeType: 'application/json' } })),
    ];

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
        setLangPack(initalLangPack);
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
                const imageData = new Map<string, string>();
                const langPack: Partial<_LanguagePack> = {};
                for (const data of resolved)
                {
                    if (data.url.includes('lang/'))
                        langPack[
                            data.url
                                .split('/')
                                .at(-1)!
                                .split('.')[0] as keyof _LanguagePack
                            ] = data.resolved as Record<string, any>;
                    if (data.url.includes('img/'))
                        imageData.set(
                            data.url,
                            data.resolved ?
                                URL.createObjectURL(new Blob([data.resolved as Blob]))
                                : 'null'
                        );
                }
                setLangPack(langPack);
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
                .then(() => {
                    setLogoVisible(() => false);
                    const postIntroAnimSpeed = getPostIntroAnimSpeed(lang ?? '');
                    if (postIntroAnimSpeed)
                        document.body.style.setProperty('--anim-playback-rate', postIntroAnimSpeed.toString());
                });
            await waitAsync(500)
                .then(() => setFinishedLoading(() => true));
        })();
    }, []);

    return <div className="rel fw fh flex j-flex-center a-flex-center">
        <AnimatePresence>
            {
                (progressPercentage < 101) &&
                <MotionBox
                    fontFamily={"Jetbrains Mono"}
                    className="fw abs b0 l0"
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: .5,
                        easings: [0.88,0, 0.22, 0],
                        delay: 0.2,
                    }}
                    color={"#eee"}
                    zIndex={1}
                >
                    <Box as={"h1"}>
                        {progressPercentage >= 100 ?
                            locale("init-prgs-bar.ready") :
                            (({ loaded, success }) => <>
                                <Box as={"span"} color={"#777"}>{progressPercentage}% {locale("init-prgs-bar.loading")} {loaded} / {loadDependencies.length}</Box>
                                { loaded !== success && <Box as={"span"} color={"#777"}>&nbsp;({loaded - success} {locale("init-prgs-bar.failed")})</Box> }
                            </>)(progressData)
                        }
                    </Box>
                    <MotionFlex
                        flexDir={"row-reverse"}
                        className="fw rel"
                        initial={{ width: 0, height: '20px', backgroundColor: '#fff' }}
                        animate={{ width: (progressPercentage > 100 ? 100 : progressPercentage) + '%' }}
                        transition={{
                            duration: .3,
                            easings: [0.88,-0.07, 0.22, 1.01],
                        }}
                    >
                        {/*<Box as={"h1"} m={"auto 0 auto auto"} mixBlendMode={"exclusion"}></Box>*/}
                    </MotionFlex>
                </MotionBox>
            }
            { introVisible && <IntroLogo key="intro-logo"/>}
            {(() => {
                if (!((logoVisible || progressPercentage < 101) && introFinished))
                    return null;
                const config = { dontAnimateChild: dontAnimate, key: `logo-endfield-${currentLang}` };
                switch (currentLang)
                {
                    case 'en':
                        return <LogoLarge_EN {...config}/>;
                    case 'cn':
                        return <LogoLarge_CN {...config}/>;
                    case 'jp':
                        return <LogoLarge_JP {...config}/>;
                    case 'kr':
                        return <LogoLarge_KR {...config}/>;
                }
            })()}
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
    const langPack = await import(`../lang/${lang}.json`);
    return {
        props:{
            lang,
            langPack: JSON.stringify(langPack),
            fullIntro: context.query.fullIntro ?? null,
        }
    };
}

export default Home;
