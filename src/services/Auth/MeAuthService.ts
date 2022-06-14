import { verify } from "jsonwebtoken"
import prismaClient from "../../prisma"

interface IRequest {
    token: string
}

interface IPayload {
    sub: string
}

interface IUser {
    username: string
    isAdmin: boolean
}


export class MeAuthService {
    async execute({token}: IRequest){

        try {
            const { sub } = verify(token, String(process.env.JWT_SECRET)) as IPayload

            const user = await prismaClient.users.findUnique({
                where: {
                    id: sub
                }
            }) as IUser

            return user

        } catch (error) {
            throw new Error('Unauthorized')
        }

    }
}