import { getUserRepository } from './getUserRepository';

export const getUserService = {
    async getAll() {
        const users = await getUserRepository.getAllUsers()
        return users
    }
}