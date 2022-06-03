import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class FindByIdOrderService {
    async execute({id}: IRequest){
        try {
            return await prismaClient.orders.findUnique({
                where: {
                    id
                },
                include: {
                    sub_orders: true,
                    company: true
                },
                rejectOnNotFound: true
            })
        }catch(e){
            throw new Error("Order not found!")
        }
    }
}