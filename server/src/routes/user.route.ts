import * as express from 'express';
import { QueryRepo } from '../repos/query';
import { UserRepo } from '../repos/user';
import { authMiddleware } from '../middlewares/auth';

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    // Create a new user
    try {
        const createdUser = await UserRepo.Create(req.body);
        const token = await UserRepo.GenerateAuthToken(createdUser);
        res.status(201).send({ createdUser: createdUser.toObject(), token });
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouter.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { userName, password } = req.body;
        const user = await UserRepo.FindByCredentials(userName, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await UserRepo.GenerateAuthToken(user);
        delete user.tokens;
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
});

userRouter.post('/logout', authMiddleware, async (req, res) => {
    // Log user out of the application
    try {
        req["user"].tokens = req["user"].tokens.filter((token) => {
            return token.token != req["token"];
        });
        await req["user"].save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

userRouter.get('/top10', authMiddleware, async (req, res, next) => {
    const topSearches = await QueryRepo.GetTopTenOfUser(req["user"].userName);
    res.status(topSearches ? 200 : 404);
    res.send(topSearches);
});

export { userRouter };
