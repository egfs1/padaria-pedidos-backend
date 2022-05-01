import prismaClient from "../../prisma"

interface IRequest {
    id: string,
    price: number
}

export class UpdatePriceService {
    async execute({id, price}: IRequest){
        try {
            return await prismaClient.prices.update({
                where: {
                    id: id
                },
                data: {
                    price: price
                },
            })
        }catch(e){
            throw new Error("Price not found!")
        }
    }
}