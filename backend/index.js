import express from 'express';
import mongoose from 'mongoose';
import artRoute from './routes/artRoute.js';
import { PORT, mongoDBURL } from "./config.js";
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cors())
// app.get('/',(request, response)=>{
//     console.log(request);
//     return response.status(234).send('Welcome To MERN Stack Tutorial');
// })
app.use(cookieParser());
app.use('/arts', artRoute);
app.use('/users', authRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });