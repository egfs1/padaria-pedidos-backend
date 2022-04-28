import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class DeleteCompanyService {
    async execute({id} : IRequest){
        try {
            return await prismaClient.companies.delete({
                where: {
                    id: id
                }
            })
        }catch(e){
            throw new Error("Company not found!")
        }
    }
}