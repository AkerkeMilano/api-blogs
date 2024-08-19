import { deleteUserRepository } from "./deleteUserRepository"

export const deleteUserService = {
    async deleteUser(id: string) {
        return await deleteUserRepository.delete(id)
    }
}