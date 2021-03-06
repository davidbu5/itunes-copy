import * as express from 'express';
import { QueryRepo } from '../repos/query';
import { ItunesApi } from '../modules/itunesApi';
import { authMiddleware } from '../middlewares/auth';

const searchRouter = express.Router();
const queryRepo = new QueryRepo();

searchRouter.get('/', authMiddleware, async (req, res, next) => {
    const userName: string = req["user"].userName;
    const queryText: string = req.query.queryText;
    await queryRepo.Create({ queryText, userName });

    const response = await ItunesApi.Search(queryText);
    res.status(response.data ? 200 : 404);
    res.send(response.data);
});

export { searchRouter };
