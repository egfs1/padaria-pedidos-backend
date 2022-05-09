import prismaClient from "../../prisma"

interface ISubOrder {
    id: string
    product_id: string
    quantity: number
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
            
            var totalValue = 0
            for (let index = 0; index < subOrders.length; index++) {

                subOrders.forEach(suborder=>{
                    if(suborder.id == subOrders[index].id){
                        const index = subOrders.indexOf(suborder)
                        subOrders.splice(index, 1)
                    }
                })

                var price = await prismaClient.prices.findFirst({
                    where: {
                        company_id: order.company_id,
                        product_id: subOrders[index].product_id,
                    },
                    rejectOnNotFound: true
                })

                var value = price.price*subOrders[index].quantity

                if(subOrders[index].id != null){
                    await prismaClient.subOrders.update({
                        where: {
                            id: subOrders[index].id
                        },
                        data: {
                            product_id: subOrders[index].product_id,
                            order_id: id,
                            quantity: subOrders[index].quantity,
                            value: value
                        }
                    })             
                } else {         
                    await prismaClient.subOrders.create({
                        data: {
                            company_id: order.company_id,
                            product_id: subOrders[index].product_id,
                            order_id: id,
                            quantity: subOrders[index].quantity,
                            value: value
                        }
                    })        
                }

                totalValue += value
            }

            subOrders.forEach(async suborder => {
                await prismaClient.subOrders.delete({
                    where: {
                        id: suborder.id
                    }
                })
            })
            
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