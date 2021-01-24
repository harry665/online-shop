
type BasketItem = {
    productId: string,
    quantity: number
}

export class Basket {
    static INSTANCE: Basket | undefined

    private basketItems: BasketItem[]

    static make() {
        if(this.INSTANCE) {
            return this.INSTANCE
        }

        this.INSTANCE = new Basket()

        return this.INSTANCE
    }

    constructor() {
        this.basketItems = []
    }

    addProduct(productId: string): void {            
        const foundProduct = this.basketItems.find(basketItem => basketItem.productId === productId)
        if(!foundProduct) {
            this.basketItems.push({
                productId: productId,
                quantity: 1
            })

            return
        }

        foundProduct.quantity++
    }

    removeProduct(productId: string): void {
        const index = this.basketItems.findIndex(basketItem => basketItem.productId === productId)

        this.basketItems.splice(index, 1)
    }

    getProducts(): BasketItem[] {
        return this.basketItems
    }

    getBasketCount(): number {
        let itemsInBasket: number = 0

        this.basketItems.forEach(product => {
            itemsInBasket += product.quantity
        })

        return itemsInBasket
    }
}