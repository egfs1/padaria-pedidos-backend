import prismaClient from "../../prisma"

interface IRequest {
    company_id: string, 
    date: Date,
    product_id: string[]
    product_price: number[]
    quantity: number[]
}

export class CreateOrderService {
    async execute({company_id, date, product_id, product_price, quantity}: IRequest){
        try {
            const order = await prismaClient.orders.create({
                data: {
                    company_id: company_id,
                    date: date,
                    value: 0
                }
            })
    
            var totalValue = 0
            for (let index = 0; index < product_id.length; index++) {

                const value = product_price[index] * quantity[index]
    
                await prismaClient.subOrders.create({
                    data: {
                        company_id: company_id,
                        product_id: product_id[index],
                        order_id: order.id,
                        quantity: quantity[index],
                        value: value
                    }
                })
                
                totalValue += value
            }

            await prismaClient.orders.update({
                where: {
                    id: order.id
                },
                data: {
                    value: totalValue
                }
            })

            return order
        } catch (error) {
            throw new Error('Something is wrong')
        }
    }
}