import 'dotenv/config'
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mainRoutes from './routes/webRoutes.js';

const __dirname = path.resolve();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.API_PORT || 3001);

app.use('/api/', mainRoutes);

app.get('/', (req, res) => {
    return res.status(404).json({ status_code: 200, message: 'Working fine'});
});

app.all('*', (req, res) => {
    return res.status(404).json({ status_code: 401, message: 'Invalid route'});
});

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

await mongoose.connect(process.env.MONGODB_URI, dbOptions).then(() => { console.log("MongoDB is connected") },
    (err) => {
        console.log("Cannot connect to the mongodb" + err);
    }
);

let server = http.createServer(app);

if(process.env.SSL === '1'){
    let sslOptions = {
        key: '',
        cert: '',
        ca: ''
    }

    server = https.createServer(sslOptions, app);
}

server.listen(app.get('port'), () => console.log('server is running on 3001'));