import superjson from 'superjson';
import {router} from "@trpc/server";
import { Context } from './createContext';

export const createRouter = () => {
    return router<Context>().transformer(superjson);
}