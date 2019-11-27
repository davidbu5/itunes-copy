import * as http from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getMainRouter } from '../routes/routing';

export function getServer() {

    const app = express();

    app.use(helmet());

    // configure handling body of requests
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ limit: '2mb' }));

    // enable cross-origin requests
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, OPTIONS, Content-Type, Accept, As-User-Name');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });
    app.use(cors());
    app.options("*", cors());

    // set routes
    app.use("/", getMainRouter());

    const server = http.createServer(app);
    return server;
}
