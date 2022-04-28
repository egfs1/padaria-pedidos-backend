import prismaClient from "../../prisma"

interface IRequest {
    company_id: string, 
    product_id: string,
    order_id: string,
    quantity: number,
    value: number
}

export class CreateSubOrderService {
    async execute({company_id, product_id, order_id, quantity, value}: IRequest){
        try {
            return await prismaClient.subOrders.create({
                data: {
                    company_id: company_id,
                    product_id: product_id,
                    order_id: order_id,
                    quantity: quantity,
                    value: value,
                }
            })
        }catch(e){
            throw new Error("Something is wrong!")
        }
    }
}