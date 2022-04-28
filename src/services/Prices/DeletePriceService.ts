import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class DeletePriceService {
    async execute({id} : IRequest){
        try {
            return await prismaClient.prices.delete({
                where: {
                    id: id
                }
            })
        }catch(e){
            throw new Error("Price not found!")
        }
    }
}