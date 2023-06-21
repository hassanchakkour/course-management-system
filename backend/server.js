import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from 'cors'
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import subModulesRoutes from "./routes/subModulesRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import questionsRoutes from "./routes/questionsRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import multer from "multer"
import path from "path"
import {fileURLToPath} from "url"

//configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/submodules", subModulesRoutes);
 app.use("/api/activities", activityRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/certificates", certificateRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(notFound);
app.use(errorHandler);

// //file storage
// const storage = multer.diskStorage({
  
//   destination: function (req, file, cb){
//     console.log(req.file)
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb){
//     cb(null, file.fieldname+ "_" +Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({
//   storage:storage
// })
// app.post('/api/activity', upload.single('image'), activityRoutes)



app.listen(port, () =>
  console.log(`Server started on PORT ${port}`.yellow.bold)
);
