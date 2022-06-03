import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class FindByIdProductService {
    async execute({id}: IRequest){
        try {
            return await prismaClient.products.findUnique({
                where: {
                    id
                },
                rejectOnNotFound: true
            })
        }catch(e){
            throw new Error("Product not found!")
        }
    }
}