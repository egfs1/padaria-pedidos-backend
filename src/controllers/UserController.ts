import { Request, Response } from "express";
import { AuthService } from "../services/Auth/AuthService";
import { CreateIfHaveNotAdminUserService } from "../services/Users/CreateIfHaveNotAdminUserService";
import { CreateUserService } from "../services/Users/CreateUserService";
import { DeleteUserService } from "../services/Users/DeleteUserService";
import { ExistsAdminUserService } from "../services/Users/ExistsAdminUserService";
import { FindByIdUserService } from "../services/Users/FindByIdUserService";
import { IndexUserService } from "../services/Users/IndexUserService";
import { UpdateUserService } from "../services/Users/UpdateUserService";

export class UserController {

    async index(request: Request, response: Response){
        const indexUserService = new IndexUserService()

        const users = await indexUserService.execute()

        return response.json(users)
    }

    async create(request: Request, response: Response){
        const { username, password, isAdmin} = request.body

        const createUserService = new CreateUserService()
        const authService = new AuthService()

        await createUserService.execute({username, password, isAdmin})

        const token = await authService.execute({username, password})

        return response.json(token)
    }

    async delete(request: Request, response: Response){
        const { id } = request.params

        const deleteUserService = new DeleteUserService()

        await deleteUserService.execute({id})

        return response.sendStatus(204)
    }

    async update(request: Request, response: Response){
        const { id } = request.params

        const { username, password, isAdmin } = request.body

        const updateUserService = new UpdateUserService()

        await updateUserService.execute({ id, username, password, isAdmin })

        return response.sendStatus(204)
    }

    async findById(request: Request, response: Response){
        const { id } = request.params

        const findByIdProductService = new FindByIdUserService()

        const user = await findByIdProductService.execute({ id })

        return response.json(user)
    }

    async createIfHaveNotAdmin(request: Request, response: Response){
        const { username, password, isAdmin} = request.body

        const createIfHaveNotAdminUserService = new CreateIfHaveNotAdminUserService()
        const authService = new AuthService()

        await createIfHaveNotAdminUserService.execute({username, password, isAdmin})

        const token = await authService.execute({username, password})

        return response.json(token)
    }

    async existsAdmin(request: Request, response: Response){
        const existsAdminUserService = new ExistsAdminUserService()
        
        const exists = await existsAdminUserService.execute()

        return response.json(exists)
    }
}