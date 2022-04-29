import prismaClient from "../../prisma"

interface IRequest {
    company_id: string
}


export class NewPriceService {
    async execute({company_id} : IRequest) {
        const company = await prismaClient.companies.findUnique({
            where: {
                id: company_id
            }
        })
        const products = await prismaClient.products.findMany({
            orderBy: [
                {
                    updatedAt: 'desc'
                }
            ]
        })

        return [company,products]
    }  
}