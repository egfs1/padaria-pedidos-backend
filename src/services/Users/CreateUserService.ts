import { hash } from "bcryptjs"
import prismaClient from "../../prisma"
import { AuthService } from "../Auth/AuthService"

interface IRequest {
    username: string
    password: string
    isAdmin: boolean
}

export class CreateUserService {
    async execute({username, password, isAdmin}: IRequest){
        try {

            const passwordHash = await hash(password, 8)

            await prismaClient.users.create({
                data: {
                    username,
                    password: passwordHash,
                    isAdmin
                }
            })

        }catch(e){
            throw new Error("User already exists")
        }
    }
}