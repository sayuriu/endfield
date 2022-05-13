import Image from 'next/image';
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Language } from "@states/global";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export const Body = () => {
    const [currentLanguage] = useAtom(Language);
    useEffect(() => {
        // console.log(currentLanguage);
    }, [currentLanguage]);
    return (<Box
        h="calc(100vh - 176px)"
        w="100vw"
        p={0}
        className={"rel"}
    >
        <AnimatePresence>

        </AnimatePresence>
    </Box>);
};
