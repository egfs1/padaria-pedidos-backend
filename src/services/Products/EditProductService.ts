import prismaClient from "../../prisma"

interface IRequest {
    id: string,
    name: string
}

export class EditProductService {
    async execute({id, name}: IRequest){
        try {
            return await prismaClient.user.update({
                where: {
                    id: id
                },
                data: {
                    name: name
                }
            })
        }catch(e){
            throw new Error("Something is wrong")
        }
    }
}