import { Product } from "./product/index"
import { IProduct } from "./product/types"


export class ProductList {
    static INSTANCE: ProductList | undefined

    private products: IProduct[]

    static make() {
        if(this.INSTANCE) {
            return this.INSTANCE
        }

        this.INSTANCE = new ProductList()

        return this.INSTANCE
    }

    private constructor() {
        const product1 = new Product('1337', "Hat - Magic Black", 10.00)
        const product2 = new Product('1338', "Shirt - Diamond Black", 15.00)
        const product3 = new Product('1339', "Pants - Carbon Black", 25.00)
        const product4 =  new Product('1340', "Shoes - Piano Black", 50.00)


        this.products = [
            {
                id: product1.id,
                name: product1.name,
                price: product1.price,
            },
            {
                id: product2.id,
                name: product2.name,
                price: product2.price,
            },
            {
                id: product3.id,
                name: product3.name,
                price: product3.price,
            },
            {
                id: product4.id,
                name: product4.name,
                price: product4.price,
            }
        ]
    }

    getProducts(): IProduct[] {
        return this.products
    }

    getProduct(id: string): IProduct {
        const product = this.products.find(product => product.id === id)
        if(!product) {
            throw new Error(`Product with id ${id} not found`)
        }

        return product
    }
}