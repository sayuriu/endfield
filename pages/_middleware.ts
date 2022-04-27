import {NextFetchEvent, NextRequest, NextResponse} from "next/server";

const langs = ['en', 'cn'];

export default function middleware( req: NextRequest, ev: NextFetchEvent ) {
    if (!langs.includes(req.nextUrl.searchParams.get('lang') || ''))
    {
        req.nextUrl.searchParams.set('lang', 'en');
        return NextResponse.redirect(req.nextUrl);
    }
    return NextResponse.next();
}
