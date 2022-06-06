import { Request, Response } from "express";
import { AuthService } from "../services/Auth/AuthService";
import { CreateUserService } from "../services/Users/CreateUserService";

export class UserController {
    async create(request: Request, response: Response){
        const { username, password, isAdmin} = request.body

        const createUserService = new CreateUserService()
        const authService = new AuthService()

        await createUserService.execute({username, password, isAdmin})

        const token = await authService.execute({username, password})

        console.log(token)

        return response.json(token)
    }
}