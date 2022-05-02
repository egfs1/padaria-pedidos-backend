import { Request, Response } from "express";
import { CreateOrderService } from "../services/Orders/CreateOrderService";
import { UpdateOrderService } from "../services/Orders/UpdateOrderService";
import { DeleteOrderService } from '../services/Orders/DeleteOrderService'
import { IndexOrderService } from "../services/Orders/IndexOrderService";
import { EditOrderService } from "../services/Orders/EditOrderService";
import { QuantitativeOrderService } from "../services/Orders/QuantitativeOrderService";

export class OrderController {

    async index(request: Request, response: Response){
        const indexOrderService = new IndexOrderService()

        const orders = await indexOrderService.execute()

        return response.json(orders)
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
        const {id} = request.params

        const deleteOrderService = new DeleteOrderService()

        await deleteOrderService.execute({id})

        return response.sendStatus(204)

    }

    async update(request: Request, response: Response){
        const {id} = request.params

        var {suborder_id, product_id, quantity} = request.body

        suborder_id = Array.isArray(suborder_id) ? suborder_id : [suborder_id]
        product_id = Array.isArray(product_id) ? product_id : [product_id]
        quantity = Array.isArray(quantity) ? quantity : [quantity]

        const updateOrderService = new UpdateOrderService()

        await updateOrderService.execute({id, suborder_id, product_id, quantity})
        
        return response.sendStatus(204)
    }

    async edit(request: Request, response: Response){
        const {id} = request.params

        const editOrderService = new EditOrderService()

        const result = await editOrderService.execute({id})

        return response.json(result)
    }

    async quantitative(request: Request, response: Response){
        const {company_id, month} = request.params

        const quantitativeOrderService = new QuantitativeOrderService()

        const result = await quantitativeOrderService.execute({company_id, month: parseInt(month)})

        return response.json(result)
    }
}

