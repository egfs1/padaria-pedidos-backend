import prismaClient from "../../prisma"


export class IndexPriceService {
    async execute(){
        try {
            return await prismaClient.prices.findMany({
                orderBy: [
                    {
                        updatedAt: 'desc'
                    },
                ],
                include: {
                    company: true,
                    product: true
                }
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}