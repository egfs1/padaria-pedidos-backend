import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
    ipAddress: string
}

export function ensureIsAuthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization
    const currentIpAddress = request.socket.remoteAddress

    if(!authToken){
        return response.status(401).end()
    }

    const [,token] = authToken.split(' ')

    try {

        const { sub, ipAddress } = verify(token, String(process.env.JWT_SECRET)) as IPayload

        if(currentIpAddress !== ipAddress){
            return response.status(401).end()
        }
        
        request.user_id = sub
        
        return next()

    } catch(error){
        return response.status(401).end()
    }
}