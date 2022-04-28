import prismaClient from "../../prisma"


export class ListCompanyService {
    async execute(){
        try {
            return await prismaClient.companies.findMany({
                orderBy: [
                    {
                        updatedAt: 'desc'
                    }
                ]
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}