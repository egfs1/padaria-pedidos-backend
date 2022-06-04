import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class FindByIdPriceService {
    async execute({id}: IRequest){
        try {
            return await prismaClient.prices.findUnique({
                where: {
                    id
                },
                include: {
                    company: true,
                    product: true
                },
                rejectOnNotFound: true
            })
        }catch(e){
            throw new Error("Price not found!")
        }
    }
}