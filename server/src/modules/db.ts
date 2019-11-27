import * as mongoose from 'mongoose';

export class DBConnection {

    static async ConnectToDB() {
        const dbName = 'itunesSearch';
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        } as any);
    }

    static async DisconnectFromDB() {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    }
}
