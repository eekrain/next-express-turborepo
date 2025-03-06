import cors from "cors";
import express from "express";
import morgan from "morgan";
import exampleRouter from "./routes/example.routes";

const app: express.Express = express();

app.use(morgan("tiny"));
app.use(express.json({ limit: "100mb" }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.get("/", (_, res) => {
  res.send("Hello from Express!");
});

app.use("/example", exampleRouter);

export default app;
