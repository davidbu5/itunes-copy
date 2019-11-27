
import * as jwt from 'jsonwebtoken';
import { UserRepo } from '../repos/user';

const auth = async (req, res, next) => {
    if (!req.header('Authorization')) {
        return res.status(401).send({ error: 'Not authorized to access this resource' });
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = await UserRepo.FindByIdAndToken(data._id, token);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

export { auth as authMiddleware };