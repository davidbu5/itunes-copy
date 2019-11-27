
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUser, IUserModel } from "../models/user";
import UserModel from "../models/user";

export class UserRepo {

    static async Create(user: IUserModel): Promise<IUser> {
        const userDocument = new UserModel(user);
        return await userDocument.save();
    }

    static async FindByIdAndToken(id: string, token: string): Promise<IUser> {
        return await UserModel.findOne({ _id: id, 'tokens.token': token }).exec();
    }

    static async FindByCredentials(userName: string, password: string): Promise<IUser> {
        // Search for a user by email and password.
        const user = await UserModel.findOne({ userName });
        if (!user) {
            throw new Error('Invalid login credentials');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new Error('Invalid login credentials');
        }
        return user;
    }

    static async GenerateAuthToken(user: IUser): Promise<string> {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
        user.tokens = user.tokens.concat({ token });
        await user.save();
        return token;
    }
}
