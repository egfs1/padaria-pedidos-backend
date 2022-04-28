import { Request, Response } from "express"
import { CreateSubOrderService } from "../services/SubOrders/CreateSubOrderService"
import { DeleteSubOrderService } from "../services/SubOrders/DeleteSubOrderService"
import { EditSubOrderService } from "../services/SubOrders/EditSubOrderService"

export class ProductController {


    async create(request: Request, response: Response){
        const {company_id, product_id, order_id, value, quantity} = request.body

        const createSubOrderService = new CreateSubOrderService()

        const subOrder = await createSubOrderService.execute({company_id, product_id, order_id, value, quantity})

        return response.json(subOrder)
    }

    async delete(request: Request, response: Response){
        const {id} = request.body

        const deleteSubOrderService = new DeleteSubOrderService()

        await deleteSubOrderService.execute({id})

    }

    async edit(request: Request, response: Response){
        const {id, product_id, order_id, value, quantity} = request.body

        const editSubOrderService = new EditSubOrderService()

        await editSubOrderService.execute({id, product_id, order_id, value, quantity})

    }
}