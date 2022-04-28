import prismaClient from "../../prisma"


export class ListPriceService {
    async execute(){
        try {
            const prices = await prismaClient.prices.findMany({
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

            const companies = await prismaClient.companies.findMany({
                orderBy: [
                    {
                        name: 'desc'
                    },
                ],
            })

            return [prices,companies]
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}