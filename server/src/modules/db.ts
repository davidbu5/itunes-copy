import * as mongoose from 'mongoose';

export class DBConnection {

    async connectToDB() {
        const dbName = 'itunesSearch';
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
    }

    async disconnectFromDB() {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    }
}
