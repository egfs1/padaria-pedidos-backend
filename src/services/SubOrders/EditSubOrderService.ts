import prismaClient from "../../prisma"

interface IRequest {
    id: string,
    product_id: string,
    order_id: string,
    quantity: number,
    value: number
}

export class EditSubOrderService {
    async execute({id, product_id, order_id, quantity, value}: IRequest){
        try {
            return await prismaClient.subOrders.update({
                where: {
                    id: id
                },
                data: {
                    product_id: product_id,
                    order_id: order_id,
                    quantity: quantity,
                    value: value,
                }
            })
        }catch(e){
            throw new Error("SubOrder not found!")
        }
    }
}