import { Request, Response } from "express";
import { CreateProductService } from "../services/Products/CreateProductService";
import { DeleteProductService } from "../services/Products/DeleteProductService";
import { UpdateProductService } from "../services/Products/UpdateProductService";
import { ListProductService } from "../services/Products/ListProductService";

export class ProductController {
    async index(request: Request, response: Response){
        const listProductService = new ListProductService()

        const products = await listProductService.execute()

        return response.json(products)
    }

    async create(request: Request, response: Response){
        const {name} = request.body

        const createProductService = new CreateProductService()

        const product = await createProductService.execute({name})

        return response.json(product)
    }

    async delete(request: Request, response: Response){
        const {id} = request.body

        const deleteProductService = new DeleteProductService()

        await deleteProductService.execute({id})

    }

    async update(request: Request, response: Response){
        const {id, name} = request.body

        const updateProductService = new UpdateProductService()

        await updateProductService.execute({id, name})

    }
}