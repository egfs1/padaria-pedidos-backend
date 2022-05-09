import prismaClient from "../../prisma"

interface ISubOrder {
    id: string
    product_id: string
    quantity: string
}

interface IRequest {
    id: string,
    subOrders: ISubOrder[]
}

export class UpdateOrderService {
    async execute({id, subOrders}: IRequest){
        try {
            const order = await prismaClient.orders.findUnique({
                where: {
                    id: id
                },
                include: {
                    sub_orders: true
                },
                rejectOnNotFound: true
            })

            order.sub_orders.forEach(async orderSubOrder => {
                var remove = true
                subOrders.forEach(subOrder => {
                    if(orderSubOrder.id == subOrder.id){
                        remove=false
                    }
                })

                if(remove){
                    await prismaClient.subOrders.delete({
                        where: {
                            id: orderSubOrder.id
                        }
                    })
                }
            })
            
            var totalValue = 0
            for (let index = 0; index < subOrders.length; index++) {

                var price = await prismaClient.prices.findFirst({
                    where: {
                        company_id: order.company_id,
                        product_id: subOrders[index].product_id,
                    },
                    rejectOnNotFound: true
                })

                var value = price.price*parseFloat(subOrders[index].quantity)

                if(subOrders[index].id){
                    await prismaClient.subOrders.update({
                        where: {
                            id: subOrders[index].id
                        },
                        data: {
                            product_id: subOrders[index].product_id,
                            order_id: id,
                            quantity: parseFloat(subOrders[index].quantity),
                            value: value
                        }
                    })             
                } else {         
                    await prismaClient.subOrders.create({
                        data: {
                            company_id: order.company_id,
                            product_id: subOrders[index].product_id,
                            order_id: id,
                            quantity: parseFloat(subOrders[index].quantity),
                            value: value
                        }
                    })        
                }

                totalValue += value
            }
            
            await prismaClient.orders.update({
                where: {
                    id: id
                },
                data: {
                    value: totalValue
                }
            })
            
        } catch (error) {
            throw new Error('Something is wrong')
        }

    }
}