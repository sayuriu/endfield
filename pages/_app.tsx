import type { AppProps } from 'next/app';
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Box, ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import "@styles/_util.scss";
import "@styles/_orders.scss";
import {useEffect} from "react";

function Main({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (window)
        {
            document.body.style.setProperty('--anim-playback-rate', '1.35');
        }
    });
    return <ChakraProvider>
        <Box className={"abs"} h={"100vh"} w={"100vw"} bg={"#000"} overflow={"hidden"}>
            <div className={"rel fw fh"}>
                <Component {...pageProps} />
            </div>
        </Box>
    </ChakraProvider>;
}

export default Main;
