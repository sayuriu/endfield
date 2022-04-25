import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
    return (<Html>
        <Head>
            {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
            <title>ENDFIELD</title>
            <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
    </Html>);
};
