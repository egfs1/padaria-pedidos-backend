import { Request, Response } from "express";
import { CreateOrderService } from "../services/Orders/CreateOrderService";
import { EditOrderService } from "../services/Orders/EditOrderService";
import { DeleteOrderService } from '../services/Orders/DeleteOrderService'
import { ListOrderService } from "../services/Orders/ListOrderService";

export class OrderController {

    async index(request: Request, response: Response){
        const listOrderService = new ListOrderService()

        const orders = listOrderService.execute()

        return response.json(orders)
    }

    async create(request: Request, response: Response){

        var {company_id, date, product_id, quantity} = request.body

        product_id = Array.isArray(product_id) ? product_id : [product_id]
        quantity = Array.isArray(quantity) ? quantity : [quantity]

        const createOrderService = new CreateOrderService()

        await createOrderService.execute({company_id, date, product_id, quantity})
    }

    async delete(request: Request, response: Response){
        const {id} = request.body

        const deleteOrderService = new DeleteOrderService()

        await deleteOrderService.execute({id})

    }

    async edit(request: Request, response: Response){

        var {id, suborder_id, product_id, quantity} = request.body

        suborder_id = Array.isArray(suborder_id) ? suborder_id : [suborder_id]
        product_id = Array.isArray(product_id) ? product_id : [product_id]
        quantity = Array.isArray(quantity) ? quantity : [quantity]

        const editOrderService = new EditOrderService()

        await editOrderService.execute({id, suborder_id, product_id, quantity})
    }

}