import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { AppRouter } from "../server/route/app.router";
import { url } from "../constants";
import { trpc } from "../utils/trpc";
import { UserContextProvider } from "../context/user.context";

function MyApp({ Component, pageProps }: AppProps) {
	const { data, error, isLoading } = trpc.useQuery(["users.me"]);

	if (isLoading) {
		return <>Loading user...</>;
	}

	return (
		<UserContextProvider value={data}>
            <main>
			    <Component {...pageProps} />
            </main>
		</UserContextProvider>
	);
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		const links = [
			loggerLink(),
			httpBatchLink({
				maxBatchSize: 10,
				url,
			}),
		];

		return {
			queryClientConfig: {
				defaultOptions: {
					queries: {
						staleTime: 60,
					},
				},
			},
			header() {
				if (ctx?.req) {
					return {
						...ctx.req.headers,
						// Means request is set on the server
						"x-ssr": "1",
					};
				}
			},
			links,
			transformer: superjson,
		};
	},
	// false means we can see every single request the client is making
	ssr: false,
})(MyApp);
