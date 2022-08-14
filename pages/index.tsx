import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

import { AvailableLanguages, ImageData, Language } from "@states/global";
import { AssetLoader, RequestData } from "@utils/loader";
import { localGet, localSet, Nullable, waitAsync } from "@utils/common";
import { InitProgressBar } from "@components/InitProgressBar/InitProgressBar";
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

const buildProgressTitle = (requestData: RequestData[]) => {
    let success = 0, failed = 0;
    for (const request of requestData) {
        if (request.progress !== 1) continue;
        request.success ? success++ : failed++;
    }
    let out = `${success + failed}/${requestData.length}`;
    if (success > 0) out += ` (${success} success)`;
    if (failed > 0) out += ` (${failed} failed)`;
    return out;
};

const Home: NextPage<PageProps> = ({ lang, fullIntro }) => {
    const [progressPercentage , setProgressPercentage] = useState(0);
    const [progressString, setProgressString] = useState("0% loading");

    const [finishedLoading, setFinishedLoading] = useState({ intro: false, label: 'a' });
    const [logoVisible, setLogoVisible] = useState(false);
    const [introVisible, setIntroVisible] = useState(false);
    const [dontAnimate, setDontAnimate] = useState<Nullable<boolean>>(true);

    const [logoBool, setLogoBool] = useState(() => () => false);

    const [currentLang, setCurrentLang] = useAtom(Language);
    const [, setImageData] = useAtom(ImageData);

    const router = useRouter();
    if (!fullIntro && 'fullIntro' in router.query)
        fullIntro = router.query.fullIntro?.toString() ?? null;

    const imageDeps = new Array(8)
        .fill(0)
        .map((_, i) => `img/0${i + 1}_HD.jpg`);

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
                imageDeps,
                {
                    responseType: 'blob',
                    mimeType: 'image/jpeg',
                    onProgressUpdate: (v) => {
                        const percentage = Math.floor(v * 100);
                        setProgressPercentage(percentage);
                        setProgressString(() => percentage === 100 ? 'Ready.' : `${percentage}% loading ${buildProgressTitle(loader.requests)}`);
                        if (v === 1) waitAsync(500).then(() => setProgressPercentage(() => 101));
                    }
                }
            );
            loader.await().then(resolved => {
                setProgressPercentage(100);
                setFinishedLoading(prev => ({ ...prev, label: 'xhr' }));
                const imageData = new Map<string, string>(
                    resolved.map(({ url, resolved: data }) => [
                        url,
                        !!data ?
                            URL.createObjectURL(new Blob([data as Blob]))
                            : 'null'
                    ]));
                setImageData(imageData);
            });
            await waitAsync(500).then(() =>  setIntroVisible(() => true));
            await waitAsync(3000).then(() => setIntroVisible(() => false));
            await waitAsync(500).then(() => {
                setLogoVisible(() => true);
                setFinishedLoading(prev => ({ ...prev, ...(prev.label === 'xhr' ? {} : { label: "" }) }));
                setLogoBool(() => () => progressPercentage < 100);
            });
            await waitAsync(animateLogo ? 6500 : 1200)
                .then(() => setLogoVisible(() => false));
            await waitAsync(500)
                .then(() => setFinishedLoading(prev => ({ ...prev, intro: true })));
        })();
    }, []);

    return <div className="rel fw fh flex j-flex-center a-flex-center">
        <AnimatePresence>
            {
                (progressPercentage !== 101) &&
                <InitProgressBar
                    progress={progressPercentage}
                    title={<Box>{progressString}</Box>}
                />
            }
            {introVisible && <IntroLogo key="intro-logo"/>}
            { currentLang === 'en' && (logoVisible || logoBool()) && <LogoLarge_EN dontAnimateChild={dontAnimate} key="logo-enfield-en"/>}
            { currentLang === 'cn' && (logoVisible || logoBool()) && <LogoLarge_CN dontAnimateChild={dontAnimate} key="logo-enfield-cn"/>}
            { currentLang === 'jp' && (logoVisible || logoBool()) && <LogoLarge_JP dontAnimateChild={dontAnimate} key="logo-enfield-jp"/>}
            {/*kr <Component "LogoLargeKR" @child>*/}
        </AnimatePresence>
        {finishedLoading.intro && progressPercentage === 101 && <>
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
