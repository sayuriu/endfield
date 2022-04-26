import {FC} from "react";
import {Box} from "@chakra-ui/react";
import {AnimatePresence, motion} from "framer-motion";
import {AnimFunctions} from "@utils/anims";
import Forceful = AnimFunctions.Forceful;
import {useRouter} from "next/router";
import {LogoSmall_CN} from "@components/logo/CN/CN-small";

export const Header: FC = () => {
    const router = useRouter();
    const { lang } = router.query;
    return (
        <motion.div
            className={"abs l0"}
            initial={{ top: -90 }}
            animate={{ top: 0 }}
            transition={{ duration: 0.5, ease: Forceful }}
        >
            <Box
                h={"88px"}
                w={"100vw"}
                bg={"#000"}
                borderBottom={"1px solid #fff"}
                className={"rel flex a-flex-center j-flex-space-between"}
            >
                <Box height={"80%"} marginLeft={"4%"}>
                    <AnimatePresence>
                        {lang === 'cn' && <LogoSmall_CN key={"logo-endfield-cn-smol"}/>}
                    </AnimatePresence>
                </Box>
                <div/>
            </Box>
        </motion.div>
    );
};
