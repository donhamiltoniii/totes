import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Simple auth middleware (replace with your strategy)
app.use(
  (
    req: Request<object, object, object, { isDondon?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { isDondon } = req.query;
    const authorized = isDondon === "barbarian";
    if (!authorized) {
      res.redirect("");
      return;
    }
    next();
  },
);

// Serve static front‑end
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(3000, () => {
  console.log("App listening on :3000");
});
