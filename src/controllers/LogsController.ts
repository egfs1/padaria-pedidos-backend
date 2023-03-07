import { Request, Response } from "express";
import { CreateLogsService } from "../services/Logs/CreateLogsService";

export class LogsController{
    async create(request: Request, response: Response){
        const { type, message } = request.body

        const createLogsService = new CreateLogsService()

        const log = await createLogsService.execute({type, message})

        return response.json(log);
    }
}