import { getServer } from './modules/server';
import { DBConnection } from './modules/db';

// require environment variables
const dotenv = require('dotenv');
dotenv.config();

DBConnection.ConnectToDB();

const server = getServer();

server.on('close', () => {
    DBConnection.DisconnectFromDB();
});
server.on('error', err => {
    console.error('server got an unexpected error.');
    console.error(err);
});

// start listening
const port = process.env.PORT || 80;
server.listen(port, () => console.log(`server is listening on port ${port}.`));
