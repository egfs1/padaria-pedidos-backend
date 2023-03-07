import prismaClient from "../../prisma";

interface IRequest{
    company_id: string,
    date: Date
}

export class ExistsOrderService {
    async execute({company_id, date} : IRequest){
        const order = await prismaClient.orders.findFirst({
            where: {
                company_id,
                date
            }
        })

        if(order){
            return true
        }else {
            return false
        }
    }
}