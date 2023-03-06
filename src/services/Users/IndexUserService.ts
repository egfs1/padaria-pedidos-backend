import prismaClient from "../../prisma"


export class IndexUserService {
    async execute(){
        try {
            return await prismaClient.users.findMany({
                orderBy: [
                    {
                        username: 'desc'
                    }
                ]
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}