import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import { AvailableLanguages } from "@states/global";

const allowedParams = ['lang', 'intro'];

export default function middleware( req: NextRequest, ev: NextFetchEvent ) {
    let invalidPath = false;
    req.nextUrl.searchParams.forEach((value, key) => {
        if (!allowedParams.includes(key))
            req.nextUrl.searchParams.delete(key);
    });

    if (
        req.nextUrl.pathname === '/' &&
        !AvailableLanguages.includes(req.nextUrl.searchParams.get('lang') || '')
    )
    {
        req.nextUrl.searchParams.set('lang', 'en');
        invalidPath = true;
    }
    if (invalidPath)
        return NextResponse.redirect(req.nextUrl);

    return NextResponse.next();
}
