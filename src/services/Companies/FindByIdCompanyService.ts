import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class FindByIdCompanyService {
    async execute({id}: IRequest){
        try {
            return await prismaClient.companies.findUnique({
                where: {
                    id
                },
                rejectOnNotFound: true
            })
        }catch(e){
            throw new Error("Company not found!")
        }
    }
}