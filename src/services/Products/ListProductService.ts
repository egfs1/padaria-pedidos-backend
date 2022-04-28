import prismaClient from "../../prisma"


export class ListProductService {
    async execute(){
        try {
            return await prismaClient.products.findMany({
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