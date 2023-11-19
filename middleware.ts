import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        authorized: ({ req, token }) => {
            if (req.nextUrl.pathname === '/register') {
                return true;
            }
            return !!token;
        },
    },
});