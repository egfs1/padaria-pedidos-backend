import prismaClient from "../../prisma"


export class IndexOrderService {
    async execute(){
        try {
            return await prismaClient.orders.findMany({
                orderBy: [
                    {
                        date: 'desc'
                    },
                ],
                include: {
                    company: true,
                    sub_orders: true
                }
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}