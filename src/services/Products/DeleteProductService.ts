import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class DeleteProductService {
    async execute({id} : IRequest){
        try {
            return await prismaClient.user.delete({
                where: {
                    id: id
                }
            })
        }catch(e){
            throw new Error("Email doesn't exist!")
        }
    }
}