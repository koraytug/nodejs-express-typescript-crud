// src/app.ts
import express, {
  Application, Request, Response, NextFunction,
} from "express";
import mongoose, { ConnectOptions } from "mongoose";

import bodyParser from "body-parser";
import cors from "cors";
import customerRoutes from "./routes/customer";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"; // Import the authentication routes
import "dotenv/config";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/customers", customerRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const mongoUri = process.env.MONGODBURI || "";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(
      "Initial Distribution API Database connection error occurred -",
      err,
    );
  });
export default app;
