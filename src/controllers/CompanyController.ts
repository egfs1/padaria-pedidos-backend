import { CreateCompanyService } from "../services/Companies/CreateCompanyService"
import { DeleteCompanyService } from "../services/Companies/DeleteCompanyService"
import { UpdateCompanyService } from "../services/Companies/UpdateCompanyService"
import { IndexCompanyService } from "../services/Companies/IndexCompanyService"
import { Request, Response } from "express"

export class CompanyController {
    async index(request: Request, response: Response){
        const indexCompanyService = new IndexCompanyService()

        const companies = await indexCompanyService.execute()

        return response.json(companies)
    }

    async create(request: Request, response: Response){
        const {name} = request.body

        const createCompanyService = new CreateCompanyService()

        const company = await createCompanyService.execute({name})

        return response.json(company)
    }

    async delete(request: Request, response: Response){
        const {id} = request.body

        const deleteCompanyService = new DeleteCompanyService()

        await deleteCompanyService.execute({id})

    }

    async update(request: Request, response: Response){
        const {id, name} = request.body

        const updateCompanyService = new UpdateCompanyService()

        await updateCompanyService.execute({id, name})

    }
}