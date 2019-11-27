import { IQuery, IQueryModel } from "../models/query";

import QueryModel from "../models/query";

export class QueryRepo {

    async Create(query: IQueryModel): Promise<void> {
        const queryDocument = new QueryModel(query);
        await queryDocument.save();
    }

    async GetTopTenOfUser(userName: string): Promise<IQuery[]> {
        const query = [
            { $match: { userName } },
            {
                $group: {
                    _id: "$queryText",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ];

        return QueryModel.aggregate(query).exec();
    }
}
