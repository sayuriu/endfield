import { useRouter } from "next/router";
import { useEffect } from "react";

export default function _500() {
    const router = useRouter();
    useEffect(() => {
        void router.prefetch("/");
        void router.push("/");
    });
}
