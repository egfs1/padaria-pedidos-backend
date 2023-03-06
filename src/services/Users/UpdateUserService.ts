import { hash } from "bcryptjs"
import prismaClient from "../../prisma"

interface IRequest {
    id: string
    username: string
    password: string
    isAdmin: boolean
}

export class UpdateUserService {
    async execute({id, username, password, isAdmin}: IRequest){
        try {
            
            if(password == ""){
                await prismaClient.users.update({
                    data: {
                        username,
                        isAdmin
                    },
                    where: {
                        id
                    }
                })
            }
            else{
                await prismaClient.users.update({
                    data: {
                        username,
                        isAdmin,
                        password: await hash(password, 8)
                    },
                    where: {
                        id
                    }
                })
            }

        }catch(e){
            throw new Error("Error while trying to update user")
        }
    }
}