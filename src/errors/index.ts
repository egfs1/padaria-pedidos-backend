import { NextFunction, Request, Response} from "express";

function error(err: Error, request: Request, response: Response, next: NextFunction){
    if (err instanceof Error){
        return response.status(400).json({
            status: "error",
            message: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
}

export default error