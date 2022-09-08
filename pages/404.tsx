import { useRouter } from "next/router";
import { useEffect } from "react";

export default function _404() {
    const router = useRouter();
    useEffect(() => {
        void router.prefetch("/");
        void router.push("/");
    });
};
