import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IQueryModel {
    userName: string;
    queryText: string;
}

export interface IQuery extends IQueryModel, Document {

}

const QuerySchema: Schema = new Schema({
    userName: { type: String, required: true },
    queryText: { type: String, required: true }
});

export default mongoose.model<IQuery>('Query', QuerySchema);