import * as bcrypt from 'bcryptjs';
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IUserModel {
    userName: string;
    password: string;
}

export interface IUser extends IUserModel, Document {
    tokens: { token: string }[];
}

const userSchema: Schema = new Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 7 },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function(next) {
    // Hash the password before saving the user model
    const user = this as IUser;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

export default mongoose.model<IUser>('User', userSchema);