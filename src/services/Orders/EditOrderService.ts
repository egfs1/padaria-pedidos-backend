import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class EditOrderService {
    async execute({id}: IRequest){
        try {
            const order = await prismaClient.orders.findFirst({
                where: {
                    id: id
                },
                include: {
                    company: true,
                    sub_orders: true
                },
                rejectOnNotFound: true
            })
        
            const prices = await prismaClient.prices.findMany({
                orderBy: [
                    {
                        updatedAt: 'asc'
                    }
                ],
                where: {
                    company_id: order.company_id,
                },
                include: {
                    product: true
                }
            })

            return [order,prices]
        } catch (error) {
            throw new Error('Order not found!')
        }
    }
}