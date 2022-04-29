import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class EditProductService {
    async execute({id}: IRequest){
        try {
            return await prismaClient.products.findUnique({
                where: {
                    id: id
                },
                rejectOnNotFound: true
            })
        } catch (error) {
            throw new Error('Product not found!')
        }
    }
}