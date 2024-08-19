import { getUserRepository } from './getUserRepository';

export const getUserService = {
    async getAll(query: any) {
        const users = await getUserRepository.getAllUsers(query)
        return users
    }
}