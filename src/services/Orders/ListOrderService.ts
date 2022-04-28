import prismaClient from "../../prisma"


export class ListOrderService {
    async execute(){
        try {
            return await prismaClient.orders.findMany()
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}