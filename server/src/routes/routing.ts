import * as express from 'express';
import { userRouter } from './user.route';
import { searchRouter } from './search.route';

export function getMainRouter() {
    const mainRouter = express.Router();
    mainRouter.use('/user', userRouter);
    mainRouter.use('/search', searchRouter);
    return mainRouter;
}
