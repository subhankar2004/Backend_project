import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({limit: "20kb", extended: false}));
app.use(express.static("public"));
app.use(cookieParser());

// Add a root route handler
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

// routes import
import userRoutes from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRoutes);

export {app};