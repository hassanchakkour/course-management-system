import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";

const port = process.env.PORT || 5000;

//connect to db
connectDB();

const app = express();

// To use req.body (data that's sent in the HTTP body)
app.use(express.json());
// To allow us to send form data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on PORT ${port}`));
