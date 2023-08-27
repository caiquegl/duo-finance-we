import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSSRAuthRedirect<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
    return async (
        ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        if (cookies["nextAuth.duoFinance"]) {
            return {
                redirect: {
                    destination: "/organizacao",
                    permanent: false,
                },
            };
        }

        return await fn(ctx);
    };
}