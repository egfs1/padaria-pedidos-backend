import { Request, Response } from "express";
import { CreateProductService } from "../services/Products/CreateProductService";
import { DeleteProductService } from "../services/Products/DeleteProductService";
import { UpdateProductService } from "../services/Products/UpdateProductService";
import { IndexProductService } from "../services/Products/IndexProductService";
import { EditProductService } from "../services/Products/EditProductService";

export class ProductController {
    async index(request: Request, response: Response){
        const indexProductService = new IndexProductService()

        const products = await indexProductService.execute()

        return response.json(products)
    }

    async create(request: Request, response: Response){
        const {name} = request.body

        const createProductService = new CreateProductService()

        const product = await createProductService.execute({name})

        return response.json(product)
    }

    async delete(request: Request, response: Response){
        const {id} = request.params

        const deleteProductService = new DeleteProductService()

        await deleteProductService.execute({id})

        return response.sendStatus(204)

    }

    async update(request: Request, response: Response){
        const {id} = request.params

        const {name} = request.body

        const updateProductService = new UpdateProductService()

        await updateProductService.execute({id, name})

        return response.sendStatus(204)
    }

    async edit(request: Request, response: Response){
        const {id} = request.params

        const editProductService = new EditProductService()

        const result = await editProductService.execute({id})

        return response.json(result)
    }
}