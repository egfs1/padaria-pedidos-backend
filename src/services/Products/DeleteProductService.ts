import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class DeleteProductService {
    async execute({id} : IRequest){
        try {
            return await prismaClient.products.delete({
                where: {
                    id: id
                }
            })
        }catch(e){
            throw new Error("Product not found!")
        }
    }
}