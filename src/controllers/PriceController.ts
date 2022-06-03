import { Request, Response } from "express"
import { CreatePriceService } from "../services/Prices/CreatePriceService"
import { DeletePriceService } from "../services/Prices/DeletePriceService"
import { UpdatePriceService } from "../services/Prices/UpdatePriceService"
import { IndexPriceService } from "../services/Prices/IndexPriceService"
import { FindByCompanyPriceService } from "../services/Prices/FindByCompanyPriceService"
import { FindByIdPriceService } from "../services/Prices/FindByIdPriceService"

export class PriceController {
    async index(request: Request, response: Response){
        const indexPriceService = new IndexPriceService()

        const prices = await indexPriceService.execute()

        return response.json(prices)
    }

    async create(request: Request, response: Response){
        const {price, company_id, product_id} = request.body

        const createPriceService = new CreatePriceService()

        const _price = await createPriceService.execute({price: parseFloat(price), company_id, product_id})

        return response.json(_price)
    }

    async delete(request: Request, response: Response){
        const {id} = request.params

        const deletePriceService = new DeletePriceService()

        await deletePriceService.execute({id})

        return response.sendStatus(204)

    }

    async update(request: Request, response: Response){
        const {id} = request.params
        
        const {price} = request.body

        const updatePriceService = new UpdatePriceService()

        await updatePriceService.execute({id, price})

        return response.sendStatus(204)
    }

    async findById(request: Request, response: Response) {
        const {id} = request.params

        const findByIdPriceService = new FindByIdPriceService()

        const price = await findByIdPriceService.execute({id})

        return response.json(price)
    }

    async findByCompany(request: Request, response: Response){
        const {company_id} = request.params

        const findByCompanyPriceService = new FindByCompanyPriceService()

        const prices = await findByCompanyPriceService.execute({company_id})

        return response.json(prices)
    }

}