import { Request, Response } from "express";
import { CreateOrderService } from "../services/Orders/CreateOrderService";

export class OrderController {
    async create(request: Request, response: Response){

        var {company_id, date, product_id, quantity} = request.body

        product_id = Array.isArray(product_id) ? product_id : [product_id]
        quantity = Array.isArray(quantity) ? quantity : [quantity]

        const createOrderService = new CreateOrderService()

        await createOrderService.execute({company_id, date, product_id, quantity})

    }
}