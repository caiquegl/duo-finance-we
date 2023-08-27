import { parseCookies } from "nookies";

export const getUser = (ctx: any) => {
    const cookies = parseCookies(ctx);
    console.log(cookies, 'cookies')
    if (cookies["nextAuth.duoFinance"]) {
        let convert = JSON.parse(cookies["nextAuth.duoFinance"])
        return convert
    }

    return {}
}