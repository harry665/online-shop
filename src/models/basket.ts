import { Product } from "./prodcut"

export class Basket {
    static INSTANCE: Basket | undefined

    private products: Product[]

    static make() {
        if(this.INSTANCE) {
            return this.INSTANCE
        }

        this.INSTANCE = new Basket()

        return this.INSTANCE
    }

    constructor() {
        this.products = []
    }

    addProduct(product: Product) {
        this.products.push(product)
    }

    removeProduct(productId: string) {
        const index = this.products.findIndex(product => product.id === productId)

        this.products.splice(index, 1)
    }

    getProducts() {
        return this.products
    }
}