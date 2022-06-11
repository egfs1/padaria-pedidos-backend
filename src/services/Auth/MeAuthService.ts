import { verify } from "jsonwebtoken"
import prismaClient from "../../prisma"

interface IRequest {
    token: string
    currentIpAdress: string
}

interface IPayload {
    sub: string
    ipAddress: string
}

interface IUser {
    username: string
    isAdmin: boolean
}


export class MeAuthService {
    async execute({token, currentIpAdress}: IRequest){

        try {
            const { sub, ipAddress } = verify(token, String(process.env.JWT_SECRET)) as IPayload

            if(ipAddress !== currentIpAdress){
                throw new Error('Unauthorized')
            }

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