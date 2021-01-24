import { Product } from "./prodcut"

export class ProductList {
    static INSTANCE: ProductList | undefined

    private products: Product[]

    static make() {
        if(this.INSTANCE) {
            return this.INSTANCE
        }

        this.INSTANCE = new ProductList()

        return this.INSTANCE
    }

    constructor() {
        this.products = [
            new Product('1337', "Hat - Magic Black", 20.00),
            new Product('1338', "Shirt - Diamond Black", 10.00),
            new Product('1339', "Pants - Carbon Black", 30.00),
            new Product('1340', "Shoes - Piano Black", 30.00)
        ]
    }

    getProducts() {
        return this.products
    }

    getProduct(id: string): Product {
        const product = this.products.find(product => product.id === id)
        if(!product) {
            throw new Error(`Product with id ${id} not found`)
        }

        return product
    }
}