export function validateRequestForCreateOrder(createOrderPayload) {
    if(!Array.isArray(createOrderPayload)) {
        throw new Error("Payload must be array/list type consisting all itemId")
    }
}