import prismaClient from "../../prisma"

interface IRequest {
    price: number,
    company_id: string,
    product_id: string
}

export class CreatePriceService {
    async execute({price, company_id, product_id}: IRequest){
        try {
            return await prismaClient.prices.create({
                data: {
                    price: price,
                    company_id: company_id,
                    product_id: product_id
                }
            })
        }catch(e){
            throw new Error("Something is wrong")
        }
    }
}