import prismaClient from "../../prisma"

interface IRequest {
    company_id: string
}

export class FindByCompanyPriceService {
    async execute({company_id}: IRequest){
        try {
            return await prismaClient.prices.findMany({
                orderBy: [
                    {
                        updatedAt: 'asc'
                    },
                ],
                where: {
                    company_id: company_id
                },

                include: {
                    product: true
                }
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}