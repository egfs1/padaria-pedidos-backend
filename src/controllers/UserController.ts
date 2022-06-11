import { Request, Response } from "express";
import { AuthService } from "../services/Auth/AuthService";
import { CreateIfHaveNotAdminUserService } from "../services/Users/CreateIfHaveNotAdminUserService";
import { CreateUserService } from "../services/Users/CreateUserService";
import { ExistsAdminUserService } from "../services/Users/ExistsAdminUserService";

export class UserController {
    async create(request: Request, response: Response){
        const { username, password, isAdmin} = request.body

        const ipAddress = String(request.socket.remoteAddress)

        console.log(ipAddress)

        const createUserService = new CreateUserService()
        const authService = new AuthService()

        await createUserService.execute({username, password, isAdmin})

        const token = await authService.execute({username, password, ipAddress})

        return response.json(token)
    }

    async createIfHaveNotAdmin(request: Request, response: Response){
        const { username, password, isAdmin} = request.body

        const ipAddress = String(request.socket.remoteAddress)

        console.log(ipAddress)

        const createIfHaveNotAdminUserService = new CreateIfHaveNotAdminUserService()
        const authService = new AuthService()

        await createIfHaveNotAdminUserService.execute({username, password, isAdmin})

        const token = await authService.execute({username, password, ipAddress})

        return response.json(token)
    }

    async existsAdmin(request: Request, response: Response){
        const existsAdminUserService = new ExistsAdminUserService()
        
        const exists = await existsAdminUserService.execute()

        return response.json(exists)
    }
}