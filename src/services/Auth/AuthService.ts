import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"

interface IRequest {
    username: string
    password: string
}

export class AuthService {
    async execute({username, password} : IRequest){
        const user = await prismaClient.users.findUnique({
            where: {
                username
            },
            rejectOnNotFound: true
        }).catch(()=> {
            throw new Error('User not found!')
        })

        const passwordMatch = await compare(password, user.password)

        if (passwordMatch){
            const token = sign({
            }, String(process.env.JWT_SECRET), {
                subject: user.id,
                expiresIn: '7d'
            })

            return {token, isAdmin: user.isAdmin}
        } else {
            throw new Error('User/Password is wrong!')
        }

    }
}