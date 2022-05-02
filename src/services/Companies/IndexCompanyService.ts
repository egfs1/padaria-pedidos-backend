import prismaClient from "../../prisma"


export class IndexCompanyService {
    async execute(){
        try {
            return await prismaClient.companies.findMany({
                orderBy: [
                    {
                        name: 'desc'
                    }
                ]
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}