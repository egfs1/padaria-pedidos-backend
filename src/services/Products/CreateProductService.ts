import prismaClient from "../../prisma"

interface IRequest {
    name: string
}

export class CreateProductService {
    async execute({name}: IRequest){
        try {
            return await prismaClient.user.create({
                data: {
                    name: name
                }
            })
        }catch(e){
            throw new Error("Email already exists")
        }
    }
}