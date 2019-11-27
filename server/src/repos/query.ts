import { IQuery, IQueryModel } from "../models/query";

import QueryModel from "../models/query";

export class QueryRepo {

    static async Create(query: IQueryModel): Promise<any> {
        const queryDocument = new QueryModel(query);
        const createdQuery = await queryDocument.save();
        return createdQuery.toObject();
    }

    static async GetTopTenOfUser(userName: string): Promise<IQuery[]> {
        const query = [
            { $match: { userName: userName } },
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
