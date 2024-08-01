import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// when using different servers we need to be able to communicate with the client which is why we need cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // if using cookieParsie must enable credentials
    credentials: true,
  })
);

// will get the cookies from the front end
app.use(cookieParser());
// simplifies creating web servers in Node.js by managing routing, request handling, and responses
app.use(express.json());
app.use("/api/auth", authRoutes);

const server = app.listen(port, () => {
  console.log("server is running on port " + port);
});
