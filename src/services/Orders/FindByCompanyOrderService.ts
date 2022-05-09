import prismaClient from "../../prisma"

interface IRequest {
    company_id: string
}

export class FindByCompanyOrderService {
    async execute({company_id}: IRequest){
        try {
            return await prismaClient.orders.findMany({
                where: {
                    company_id: company_id
                },
                orderBy: [
                    {
                        date: 'desc'
                    },
                ],
                include: {
                    sub_orders: true,
                    company: true
                }
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}