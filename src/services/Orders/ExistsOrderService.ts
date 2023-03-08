import prismaClient from "../../prisma";

interface IRequest{
    company_id: string,
    date: Date
}

export class ExistsOrderService {
    async execute({company_id, date} : IRequest){

        const midnight = new Date(date)
        midnight.setDate(midnight.getDate()+1)
        midnight.setHours(20,59,59)

        const order = await prismaClient.orders.findFirst({
            where: {
                AND:[
                    {
                        company_id
                    },
                    {
                        date:{
                            gte: date,
                            lte: midnight
                        }
                    }
                ]
            }
        })

        return order != null
    }
}