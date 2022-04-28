import prismaClient from "../../prisma"

interface IRequest {
    id: string,
    price: number,
    company_id: string,
    product_id: string
}

export class UpdatePriceService {
    async execute({id, price, company_id, product_id}: IRequest){
        try {
            return await prismaClient.prices.update({
                where: {
                    id: id
                },
                data: {
                    price: price,
                    company_id: company_id,
                    product_id: product_id
                },
            })
        }catch(e){
            throw new Error("Price not found!")
        }
    }
}