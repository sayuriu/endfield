import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'jotai';
import '../styles/globals.css';
import "@styles/_util.scss";
import "@styles/_orders.scss";

function Main({ Component, pageProps }: AppProps) {
    return <Provider>
        <Head>
            <title>ENDFIELD</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
        </Head>
        <ChakraProvider>
            <Box className={"abs overflow-hidden"} h={"100vh"} w={"100vw"} bg={"#000"}>
                <div className={"rel fw fh"}>
                    <Component {...pageProps} />
                </div>
            </Box>
        </ChakraProvider>
    </Provider>;
}

export default Main;
