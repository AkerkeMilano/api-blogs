import { ApiEntityType } from "./types"
import { apiRepository } from "./apiRepository";
export const apiService = {
    async addApi(dto: ApiEntityType){
        const addedApiId = await apiRepository.addApiRequest(dto)
        return addedApiId
    },
    async getApiCounts(dto: ApiEntityType, limit: Date){
        const requestCount = await apiRepository.getApiCount(dto, limit)
        if(requestCount >= 5){
            return null
        }
        console.log("req count", requestCount);
        return true
    }
}