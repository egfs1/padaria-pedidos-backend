import prismaClient from "../../prisma";

export class ExistsAdminUserService {
    async execute(){
        const user = await prismaClient.users.findFirst({
            where: {
                isAdmin: true
            }
        })

        if(user){
            return true
        }else {
            return false
        }
    }
}