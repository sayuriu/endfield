import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Language } from "@states/global";
import { useEffect } from "react";

export const Body = () => {
    const [currentLanguage] = useAtom(Language);
    useEffect(() => {
        // console.log(currentLanguage);
    }, [currentLanguage]);
    return (<Box
        h="calc(100vh - 176px)"
        w="100vw"
        padding="0"
    >

    </Box>);
};
