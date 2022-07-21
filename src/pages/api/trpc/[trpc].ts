import { createContext } from '../../../server/createContext';
import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter } from "../../../server/route/app.router"

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
    onError({error}) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
            console.error("Internal server error", error);
        } else {
            console.error("Error", error);
        }
    }
})