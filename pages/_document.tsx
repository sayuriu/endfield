import { Head, Html, Main, NextScript } from "next/document";

const PreloadFont = ({ name }: { name: string }) => <link href={`assets/fonts/${name}.ttf`} rel={"preload"} as={"font"} crossOrigin={""}></link>;

export default function Document() {
    return (
        <Html>
            <Head>
                <PreloadFont name={"JetBrainsMono-Regular"}/>
                <PreloadFont name={"JetBrainsMono-Italic"}/>
                <PreloadFont name={"Oswald-Regular"}/>
                <PreloadFont name={"Oswald-Bold"}/>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
};
