import { Request, Response } from "express";
import { AuthService } from "../services/Auth/AuthService";
import { MeAuthService } from "../services/Auth/MeAuthService";

export class AuthController {
    async auth(request: Request, response: Response){
        const { username, password } = request.body

        const authService = new AuthService()

        const token = await authService.execute({username, password})

        return response.json(token)
    }

    async me(request: Request, response: Response){
        const { token } = request.body

        const meAuthService = new MeAuthService()

        const user = await meAuthService.execute({token})

        return response.json(user)
    }
}