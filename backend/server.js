import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import activityRoutes from './routes/activityRoutes.js'
 import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import questionsRoutes from './routes/questionsRoutes.js';
// <<<<<<< hassan
// import badgeRoutes from './routes/badgeRoutes.js'
// import certificateRoutes  from './routes/certificateRoutes.js'
// =======
// import courseRoutes from "./routes/courseRoutes.js";
// import moduleRoutes from "./routes/moduleRoutes.js";
// >>>>>>> master

const { 
   PORT
} = process.env

const port = process.env.PORT || 5000;

//connect to db
connectDB();

const app = express();

// To use req.body (data that's sent in the HTTP body)
app.use(express.json());
// To allow us to send form data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/submission',submissionRoutes)
app.use('/api/questions',questionsRoutes);
// <<<<<<< hassan
// app.use('/api/badges',badgeRoutes);
// app.use('/api/certificates',certificateRoutes);
// =======
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
// >>>>>>> master


app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on PORT ${port}`));
