import { Request, Response } from "express"
import { CreatePriceService } from "../services/Prices/CreatePriceService"
import { DeletePriceService } from "../services/Prices/DeletePriceService"
import { UpdatePriceService } from "../services/Prices/UpdatePriceService"
import { IndexPriceService } from "../services/Prices/IndexPriceService"
import { EditPriceService } from "../services/Prices/EditPriceService"

export class PriceController {
    async index(request: Request, response: Response){
        const indexPriceService = new IndexPriceService()

        const result = await indexPriceService.execute()

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

    async edit(request: Request, response: Response){
        const {id} = request.params

        const editPriceService = new EditPriceService()

        const result = await editPriceService.execute({id})

        return result
    }
}