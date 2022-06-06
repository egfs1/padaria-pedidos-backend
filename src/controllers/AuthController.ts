import { Request, Response } from "express";
import { AuthService } from "../services/Auth/AuthService";

export class AuthController {
    async auth(request: Request, response: Response){
        const { username, password } = request.body

        const authService = new AuthService()

        const token = authService.execute({username, password})

        return response.json(token)
    }
}