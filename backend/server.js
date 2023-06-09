import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import subModulesRoutes from "./routes/subModulesRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import questionsRoutes from "./routes/questionsRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/submodules", subModulesRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/submission", submissionRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/certificates", certificateRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on PORT ${port}`.yellow.bold)
);
