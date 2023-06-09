import { Json } from "../core";
import { ThirdwebAuthConfig, ThirdwebAuthUser } from "./types";
import express, { Request } from "express";
export * from "./types";
type ThirdwebAuthReturnType<TData extends Json = Json, TSession extends Json = Json> = {
    authRouter: express.Router;
    authMiddleware: express.RequestHandler;
    getUser: (req: Request) => Promise<ThirdwebAuthUser<TData, TSession> | null>;
};
export declare function ThirdwebAuth<TData extends Json = Json, TSession extends Json = Json>(cfg: ThirdwebAuthConfig<TData, TSession>): ThirdwebAuthReturnType<TData, TSession>;
//# sourceMappingURL=index.d.ts.map