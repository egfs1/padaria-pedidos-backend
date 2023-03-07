import prismaClient from "../../prisma"

interface IRequest {
    type: string,
    message: string
}

export class CreateLogsService {
    async execute({type, message}: IRequest){
        try {
            return await prismaClient.logs.create({
                data: {
                    type,
                    message
                }
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}