import prismaClient from "../../prisma"

interface IRequest {
    name: string
}

export class CreateCompanyService {
    async execute({name}: IRequest){
        try {
            return await prismaClient.companies.create({
                data: {
                    name: name
                }
            })
        }catch(e){
            throw new Error("Company already exists")
        }
    }
}