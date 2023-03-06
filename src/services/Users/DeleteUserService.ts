import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class DeleteUserService {
    async execute({id} : IRequest){
        try {
            return await prismaClient.users.delete({
                where: {
                    id: id
                }
            })
        }catch(e){
            throw new Error("User not found!")
        }
    }
}