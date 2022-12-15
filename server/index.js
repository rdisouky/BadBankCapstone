import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import serviceRoutes from './routes/services.js';
import dataRoutes from './routes/data.js';

const app = express();
app.use(cors());


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const CONNECTION_URL = '';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message));

app.use('/users', userRoutes);
app.use('/service', serviceRoutes);
app.use('/alldata', dataRoutes);
// mongoose.set('useFindAndModify',false);