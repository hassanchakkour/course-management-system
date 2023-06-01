import express from 'express'; 
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import activityRoutes from './routes/activityRoutes.js'
 import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const { 
   PORT
} = process.env


//connect to db
connectDB()

const app = express();

// To use req.body (data that's sent in the HTTP body)
app.use(express.json());
// To allow us to send form data
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/activites', activityRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
