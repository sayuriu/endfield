import {FC} from "react";
import {Box} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {AnimFunctions} from "@utils/anims";
import Forceful = AnimFunctions.Forceful;

export const Header:  FC = () => {
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

            </Box>
        </motion.div>
    );
};
