import { Request, Response } from "express";
import { CreateOrderService } from "../services/Orders/CreateOrderService";
import { UpdateOrderService } from "../services/Orders/UpdateOrderService";
import { DeleteOrderService } from '../services/Orders/DeleteOrderService'
import { ListOrderService } from "../services/Orders/ListOrderService";

export class OrderController {

    async index(request: Request, response: Response){
        const listOrderService = new ListOrderService()

        const result = listOrderService.execute()

        return response.json(result)
    }

    async create(request: Request, response: Response){

        var {company_id, date, product_id, quantity} = request.body

        product_id = Array.isArray(product_id) ? product_id : [product_id]
        quantity = Array.isArray(quantity) ? quantity : [quantity]

        const createOrderService = new CreateOrderService()

        const order = await createOrderService.execute({company_id, date, product_id, quantity})
    
        return response.json(order)
    }

    async delete(request: Request, response: Response){
        const {id} = request.body

        const deleteOrderService = new DeleteOrderService()

        await deleteOrderService.execute({id})

    }

    async update(request: Request, response: Response){

        var {id, suborder_id, product_id, quantity} = request.body

        suborder_id = Array.isArray(suborder_id) ? suborder_id : [suborder_id]
        product_id = Array.isArray(product_id) ? product_id : [product_id]
        quantity = Array.isArray(quantity) ? quantity : [quantity]

        const updateOrderService = new UpdateOrderService()

        await updateOrderService.execute({id, suborder_id, product_id, quantity})
    }

}