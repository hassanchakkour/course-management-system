import express from 'express'; 
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

 import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';


//connect to db
mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      //listen for request
      app.listen(process.env.PORT, () => {
      console.log('Connected to db && listening on port ', process.env.PORT);
        })
   })
   .catch((error) => {
      console.log(error)
   })

const app = express();

// To use req.body (data that's sent in the HTTP body)
app.use(express.json());
// To allow us to send form data
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users', userRoutes);
//app.use('/api/activites', activityRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);


