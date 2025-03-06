import express from "express";
import { getTest } from "../controller/example.controller";

const exampleRouter = express.Router();

exampleRouter.get("/test", getTest);

export default exampleRouter;
