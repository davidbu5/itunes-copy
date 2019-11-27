
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUser, IUserModel } from "../models/user";
import UserModel from "../models/user";

export class UserRepo {

    async Create(user: IUserModel): Promise<IUser> {
        const userDocument = new UserModel(user);
        // Hash the password before saving the user model
        userDocument.password = await bcrypt.hash(user.password, 8);
        return await userDocument.save();
    }

    async FindByUserIdAndToken(id: string, token: string): Promise<IUser> {
        return await UserModel.findOne({ _id: id, 'tokens.token': token }).exec();
    }

    async FindByCredentials(userName: string, password: string): Promise<IUser> {
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

    async GenerateAuthToken(user: IUser): Promise<string> {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        user.tokens = user.tokens.concat({ token });
        await user.save();
        return token;
    }
}
