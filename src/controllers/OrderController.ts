import { Request, Response } from "express";
import { CreateOrderService } from "../services/Orders/CreateOrderService";
import { UpdateOrderService } from "../services/Orders/UpdateOrderService";
import { DeleteOrderService } from '../services/Orders/DeleteOrderService'
import { IndexOrderService } from "../services/Orders/IndexOrderService";
import { QuantitativeOrderService } from "../services/Orders/QuantitativeOrderService";
import { FindByCompanyOrderService } from "../services/Orders/FindByCompanyOrderService";
import { FindByIdOrderService } from "../services/Orders/FindByIdOrderServicel";
import { ExistsOrderService } from "../services/Orders/ExistsOrderService";

export class OrderController {

    async index(request: Request, response: Response){
        const indexOrderService = new IndexOrderService()

        const orders = await indexOrderService.execute()

        return response.json(orders)
    }

    async create(request: Request, response: Response){

        var {company_id, date, product_id, product_price, quantity} = request.body

        const createOrderService = new CreateOrderService()

        const order = await createOrderService.execute({company_id, date, product_id, product_price, quantity})
    
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

        const {subOrders, date} = request.body

        const updateOrderService = new UpdateOrderService()

        await updateOrderService.execute({id, subOrders, date})
        
        return response.sendStatus(204)
    }

    async findById(request: Request, response: Response) {
        const {id} = request.params

        const findByIdOrderService = new FindByIdOrderService()

        const order = await findByIdOrderService.execute({id})

        return response.json(order)
    }

    async findByCompany(request: Request, response: Response){
        const {company_id} = request.params

        const findByCompanyOrderService = new FindByCompanyOrderService()

        const result = await findByCompanyOrderService.execute({company_id})

        return response.json(result)
    }

    async quantitative(request: Request, response: Response){
        const {company_id, month} = request.params

        const quantitativeOrderService = new QuantitativeOrderService()

        const result = await quantitativeOrderService.execute({company_id, month: parseInt(month)})

        return response.json(result)
    }

    async exists(request: Request, response: Response){
        const { company_id, date} = request.body
        
        const existsOrderService = new ExistsOrderService()

        const exists = await existsOrderService.execute({company_id, date})

        return response.json(exists)
    }
}

