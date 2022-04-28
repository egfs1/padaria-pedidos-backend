import prismaClient from "../../prisma"


export class ListPricesService {
    async execute(){
        try {
            return await prismaClient.prices.findMany()
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}