import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv'

import userRoutes from './routes/users.js';
import serviceRoutes from './routes/services.js';
import dataRoutes from './routes/data.js';

dotenv.config()
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");

const app = express();
app.use(express.static(buildPath));

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message));

app.get("*", (req, res) => {
    res.sendFile(
        path.join(_dirname, "../client/build/index.html"),
        (err) => {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.use('/users', userRoutes);
app.use('/service', serviceRoutes);
app.use('/alldata', dataRoutes);