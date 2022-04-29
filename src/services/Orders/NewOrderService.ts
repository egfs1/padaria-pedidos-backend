import prismaClient from "../../prisma"

interface IRequest {
    company_id: string
}


export class NewPriceService {
    async execute({company_id} : IRequest) {
        try {
            const company = await prismaClient.companies.findUnique({
                where: {
                    id: company_id
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

            return [company,prices]
            
        } catch (error) {
            throw new Error('Something is wrong')
        }
    }  
}