import { Request, Response } from "express"
import { CreatePriceService } from "../services/Prices/CreatePriceService"
import { DeletePriceService } from "../services/Prices/DeletePriceService"
import { UpdatePriceService } from "../services/Prices/UpdatePriceService"
import { ListPriceService } from "../services/Prices/ListPriceService"

export class PriceController {
    async index(request: Request, response: Response){
        const listPriceService = new ListPriceService()

        const result = await listPriceService.execute()

        return response.json(result)
    }

    async create(request: Request, response: Response){
        const {price, company_id, product_id} = request.body

        const createPriceService = new CreatePriceService()

        const _price = await createPriceService.execute({price, company_id, product_id})

        return response.json(_price)
    }

    async delete(request: Request, response: Response){
        const {id} = request.body

        const deletePriceService = new DeletePriceService()

        await deletePriceService.execute({id})

    }

    async update(request: Request, response: Response){
        const {id, price, company_id, product_id} = request.body

        const updatePriceService = new UpdatePriceService()

        await updatePriceService.execute({id, price, company_id, product_id})

    }
}