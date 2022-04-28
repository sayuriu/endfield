import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel={"prefetch"}
                    href={"/fonts/JetBrainsMono-Regular.ttf"}
                    as={"font"}
                    crossOrigin={""}
                /><link
                    rel={"prefetch"}
                    href={"/fonts/JetBrainsMono-Italic.ttf"}
                    as={"font"}
                    crossOrigin={""}
                />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
};
