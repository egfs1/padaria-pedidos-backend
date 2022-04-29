import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class EditPriceService {
    async execute({id}: IRequest){
        try {
            const price = await prismaClient.prices.findUnique({
                where: {
                    id: id
                },
                rejectOnNotFound: true
            })
            const companies = await prismaClient.companies.findMany({
                orderBy: [
                    {
                        name: 'desc'
                    }
                ]
            })
            const products = await prismaClient.products.findMany({
                orderBy: [
                    {
                        name: 'desc'
                    }
                ]
            })

            return [price,companies,products]
        } catch (error) {
            throw new Error('Price not found!')
        }
    }
}