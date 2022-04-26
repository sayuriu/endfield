import type { AppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import "@styles/_util.scss";
import "@styles/_orders.scss";
import {useEffect} from "react";
import Head from 'next/head';

function Main({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>ENDFIELD</title>
        </Head>
        <ChakraProvider>
            <Box className={"abs overflow-hidden"} h={"100vh"} w={"100vw"} bg={"#000"}>
                <div className={"rel fw fh"}>
                    <Component {...pageProps} />
                </div>
            </Box>
        </ChakraProvider>
    </>;
}

export default Main;
