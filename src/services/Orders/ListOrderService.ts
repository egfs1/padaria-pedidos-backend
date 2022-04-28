import prismaClient from "../../prisma"


export class ListOrderService {
    async execute(){
        try {
            const orders = await prismaClient.orders.findMany({
                orderBy: [
                    {
                        date: 'desc'
                    },
                ],
                include: {
                    company: true
                }
            })

            const companies = await prismaClient.companies.findMany({
                orderBy: [
                    {
                        name: 'desc'
                    },
                ],
            })

            return [orders,companies]


        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}