import prismaClient from "../../prisma"

interface IRequest {
    id: string
}

export class EditCompanyService {
    async execute({id}: IRequest) {
        try {
            return await prismaClient.companies.findFirst({
                where: {
                    id: id
                },
                rejectOnNotFound: true
            })

        } catch (error) {
            throw new Error('Company not found!')
        }
    }
}