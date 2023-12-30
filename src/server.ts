import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// init middleware
app.use(cors());
app.use(
  morgan(`${process.env.NODE_ENV === "production"} ? 'combined' : 'dev'`)
);
app.use(helmet());
app.use(compression());

// init database
import "./db/init.mongodb";

// init routes

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(200).json({ message: "ok" });
  }
);

// handle error

// server
const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express."));
  // notify.send(`ping...`)
});
