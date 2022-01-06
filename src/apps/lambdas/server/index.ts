import { createExpressMiddleware } from "@trpc/server/adapters/express";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createContext } from "./context";
import { appRouter } from "./router";

export const app = express();
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
