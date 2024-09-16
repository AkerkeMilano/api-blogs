import { apiCollection } from "../db/mongo-db"
import { ApiEntityType } from "./types"

export const apiRepository = {
    async addApiRequest(dto: ApiEntityType) {
        const addedApi = await apiCollection.insertOne({
            ip: dto.ip,
            url: dto.url,
            date: dto.date
        })
        return addedApi.insertedId.toString()
    },
    async getApiCount(dto: ApiEntityType, limitSec: Date) {
        const requestCount = await apiCollection.countDocuments({
            ip: dto.ip,
            url: dto.url,
            date: { $gte: limitSec}
          });

        return requestCount
    }
}