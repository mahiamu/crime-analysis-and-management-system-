import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import reportsRoutes from './routes/reports.js';
import userRouter from './routes/userRouter.js';

import User from "./models/User.js";





/* CONFIGURATIONS */
 
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());



/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});*/

/* ROUTES */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/reports", reportsRoutes);
app.use('/user', userRouter);

/* MONGOOES SETUP */
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL,{  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(()=>{
    app.listen(PORT, ()=> console.log(`server port: ${PORT}`))


    /* ONLY ADD DATA ONE TIME */
   //  User.insertMany(dataUser);
}).catch((error)=> console.log(`${error} did not connect`))


