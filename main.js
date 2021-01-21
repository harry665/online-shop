/**
 * Product model
 */
class Product {
    constructor(id, name, price) {
        this.id = id
        this.name = name
        this.price = price
    }
}

/**
 * Basket model (singleton pattern)
 */
class Basket {
    static INSTANCE

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

    addProduct(product) {
        this.products.push(product)
    }

    removeProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId)

        this.products.splice(index, 1)
    }

    getProducts() {
        return this.products
    }
}

const basket = Basket.make()

const product1 = new Product(1337, "hat", 5.00)
const product2 = new Product(1338, "tshirt", 10.00)

basket.addProduct(product1)
basket.addProduct(product2)

console.log(basket.getProducts());