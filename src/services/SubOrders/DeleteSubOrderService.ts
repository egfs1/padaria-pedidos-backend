import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class DeleteSubOrderService {
    async execute({id} : IRequest){
        try {
            return await prismaClient.subOrders.delete({
                where: {
                    id: id
                }
            })
        }catch(e){
            throw new Error("SubOrder not found!")
        }
    }
}