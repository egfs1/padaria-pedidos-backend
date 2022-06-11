import { hash } from "bcryptjs"
import prismaClient from "../../prisma"

interface IRequest {
    username: string
    password: string
    isAdmin: boolean
}

export class CreateIfHaveNotAdminUserService {
    async execute({username, password, isAdmin}: IRequest){
        try {

            const exists = await prismaClient.users.findFirst({
                where: {
                    isAdmin: true
                }
            })

            if(exists){
                throw new Error("Admin already exists")
            }

            const passwordHash = await hash(password, 8)

            await prismaClient.users.create({
                data: {
                    username,
                    password: passwordHash,
                    isAdmin
                }
            })

        }catch(e){
            throw new Error("Admin already exists")
        }
    }
}