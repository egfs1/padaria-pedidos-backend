import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class DeleteOrderService {
    async execute({id} : IRequest){
        try {
            return await prismaClient.orders.delete({
                where: {
                    id: id
                }
            })
        }catch(e){
            throw new Error("Order not found!")
        }
    }
}