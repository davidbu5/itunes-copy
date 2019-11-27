import { getServer } from './modules/server';
import { DBConnection } from './modules/db';

// require environment variables
require('dotenv').config();

const connection = new DBConnection();
connection.connectToDB().then(() => {

    const server = getServer();

    server.on('close', () => {
        connection.disconnectFromDB();
    });
    server.on('error', err => {
        console.error('server got an unexpected error.');
        console.error(err);
    });

    // start listening
    const port = 80;
    server.listen(port, () => console.log(`server is listening on port ${port}.`));
    
}).catch(err => console.log(err));

