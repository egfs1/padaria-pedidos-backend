import { Request, Response } from "express";
import { AuthService } from "../services/Auth/AuthService";
import { MeAuthService } from "../services/Auth/MeAuthService";

export class AuthController {
    async auth(request: Request, response: Response){
        const { username, password } = request.body

        const ipAddress = String(request.socket.remoteAddress)

        const authService = new AuthService()

        const token = await authService.execute({username, password, ipAddress})

        return response.json(token)
    }

    async me(request: Request, response: Response){
        const { token } = request.body

        const ipAddress = String(request.socket.remoteAddress)

        const meAuthService = new MeAuthService()

        const user = await meAuthService.execute({token, currentIpAdress: ipAddress})

        return response.json(user)
    }
}