import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export async function ensureIsAdmin(request: Request, response: Response, next: NextFunction) {
    const  { user_id } = request

    const user = await prismaClient.users.findUnique({
        where: {
            id: user_id
        },
        rejectOnNotFound: true
    }).catch(()=> {
        throw new Error('User not found!')
    })

    if(user.isAdmin){
        return next()
    }

    return response.status(401).json({
        error: "Unauthorized"
    })
    
}