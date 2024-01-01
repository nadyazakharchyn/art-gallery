import express from 'express';
import mongoose from 'mongoose';
import artRoute from './routes/artRoute.js';
import galleryRoute from './routes/galleryRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import { PORT, mongoDBURL } from "./config.js";
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
var corsOptions = {
  origin: 'http://127.0.0.1:5173',
  credentials: true
}
app.use(cors(corsOptions))
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
})
app.use(cookieParser());
app.use('/arts', artRoute);
app.use('/users', authRoute);
app.use('/galleries', galleryRoute);
app.use('/bookings', bookingRoute);
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