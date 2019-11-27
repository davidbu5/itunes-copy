import * as express from 'express';
import { QueryRepo } from '../repos/query';
import { UserRepo } from '../repos/user';
import { authMiddleware } from '../middlewares/auth';

const userRouter = express.Router();
const userRepo = new UserRepo();
const queryRepo = new QueryRepo();

userRouter.post('/', async (req, res) => {
    try {
        const createdUser = await userRepo.Create(req.body);
        const token = await userRepo.GenerateAuthToken(createdUser);
        res.status(201).send({ createdUser: createdUser.toObject(), token });
    } catch (error) {
        res.status(400).send(error)
    }
});

userRouter.post('/login', async(req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userRepo.FindByCredentials(userName, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await userRepo.GenerateAuthToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
});

userRouter.post('/logout', authMiddleware, async (req, res) => {
    try {
        req["user"].tokens = [];
        await req["user"].save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

userRouter.get('/top10', authMiddleware, async (req, res, next) => {
    const topSearches = await queryRepo.GetTopTenOfUser(req["user"].userName);
    res.status(topSearches ? 200 : 404);
    res.send(topSearches);
});

export { userRouter };
