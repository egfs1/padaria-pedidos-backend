import prismaClient from "../../prisma"

interface IRequest {
    company_id: string,
    month: number
}

interface Quantitative {
    product: string,
    quantity: number,
    value: number
}

export class QuantitativeOrderService {
    async execute({company_id, month}: IRequest) {
        try {
            const orders = await prismaClient.orders.findMany({
                where: {
                    date: {
                        gte: new Date(Date.UTC(2022,month-1,1,0,0,0)),
                        lte: new Date(Date.UTC(2022,month-1,31,23,59,59)),
                    },
                    company_id: company_id,
                },
                include: {
                    sub_orders: true
                }
            })
        
            const prices = await prismaClient.prices.findMany({
                orderBy: [
                    {
                        updatedAt: 'asc'
                    }
                ],
                where: {
                    company_id: company_id,
                },
                include: {
                    product: true
                }
            })
    
            var quantitatives: Quantitative[] = []
            var days: number[] = []
    
            for (let index = 0; index < prices.length; index++) {
                var quantity = 0
                var value = 0
                orders.forEach(order => {
                    order.sub_orders.forEach(suborder => {
                        if (prices[index].product_id == suborder.product_id){
                            quantity += suborder.quantity
                            value += suborder.value
                        }
                    })
                    if (!days.includes(order.date.getUTCDate())){
                        days.push(order.date.getUTCDate())
                    }
                })
                quantitatives.push({
                    product: prices[index].product.name,
                    quantity: quantity,
                    value: value
                })
            }
    
            const totalDaysInMonth = new Date(2022, month, 0).getDate();
            var days_left: number[] = []
    
            for (let index = 1; index <= totalDaysInMonth; index++) {
                if (!days.includes(index)){
                    days_left.push(index)
                }
            }
    
            return [quantitatives, days_left]

        } catch (error) {
            throw new Error('Something is wrong')
        }
    }
}