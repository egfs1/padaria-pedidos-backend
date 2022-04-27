import prismaClient from "../../prisma"


export class ListCompanyService {
    async execute(){
        try {
            return await prismaClient.companies.findMany()
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}