import prismaClient from "../../prisma"

interface IRequest {
    id: string,
    suborder_id: string[],
    product_id: string[],
    quantity: number[]
}

export class UpdateOrderService {
    async execute({id, suborder_id, product_id, quantity}: IRequest){
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

            var subOrders = order.sub_orders
            
            var totalValue = 0

            for (let index = 0; index < suborder_id.length; index++) {
                

                subOrders.forEach(suborder=>{
                    if(suborder.id == suborder_id[index]){
                        const index = subOrders.indexOf(suborder)
                        subOrders.splice(index, 1)
                    }
                })

                var price = await prismaClient.prices.findFirst({
                    where: {
                        company_id: order.company_id,
                        product_id: product_id[index],
                    },
                    rejectOnNotFound: true
                })

                var value = price.price*quantity[index]

                if(suborder_id[index]!= 'null'){
                    await prismaClient.subOrders.update({
                        where: {
                            id: suborder_id[index]
                        },
                        data: {
                            product_id: product_id[index],
                            order_id: id,
                            quantity: quantity[index],
                            value: value
                        }
                    })             
                } else {         
                    await prismaClient.subOrders.create({
                        data: {
                            company_id: order.company_id,
                            product_id: product_id[index],
                            order_id: id,
                            quantity: quantity[index],
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