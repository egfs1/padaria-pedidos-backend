import { Request, Response } from "express";
import { CreateProductService } from "../services/Products/CreateProductService";
import { DeleteProductService } from "../services/Products/DeleteProductService";
import { EditProductService } from "../services/Products/EditProductService";
import { ListProductService } from "../services/Products/ListProductsService";

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

    async edit(request: Request, response: Response){
        const {id, name} = request.body

        const editProductService = new EditProductService()

        await editProductService.execute({id, name})

    }
}