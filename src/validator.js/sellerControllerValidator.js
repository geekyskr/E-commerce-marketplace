export function validateRequestForCreateCatalog(createCatalogPayload) {
    if(!Array.isArray(createCatalogPayload)) {
        throw new Error("Payload must be array/list type consisting all product details")
    }
    for(let productDetails of createCatalogPayload) {
        if(!Array.isArray(productDetails)){
            throw new Error("product details must be array/list type consisting product name and price")
        }
    }
}