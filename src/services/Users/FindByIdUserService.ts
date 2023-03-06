import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class FindByIdUserService {
    async execute({id}: IRequest){
        try {
            return await prismaClient.users.findUnique({
                where: {
                    id
                },
                rejectOnNotFound: true
            })
        }catch(e){
            throw new Error("User not found!")
        }
    }
}