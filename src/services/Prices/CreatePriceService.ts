import prismaClient from "../../prisma"

interface IRequest {
    price: number,
    company_id: string,
    product_id: string
}

export class CreatePriceService {
    async execute({price, company_id, product_id}: IRequest){
        try {

            const _price = await prismaClient.prices.findFirst({
                where: {
                    company_id: company_id,
                    product_id: product_id
                }
            })

            if (_price == null){
                throw new Error("Price already exists")
            }


            return await prismaClient.prices.create({
                data: {
                    price: price,
                    company_id: company_id,
                    product_id: product_id
                }
            })
        }catch(e){
            throw new Error("Price already exists")
        }
    }
}