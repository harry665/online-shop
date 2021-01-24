import { ProductList } from "./product-list"

type BasketRaw = {
    productId: string,
    quantity: number
}

type BasketItem = {
    id: string,
    name: string,
    quantity: number,
    totalPrice: number
}

type BasketData = {
    items: BasketItem[],
    totalPrice: number
}

export class Basket {
    static INSTANCE: Basket | undefined

    private basketItems: BasketRaw[]

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

    getItems(): BasketRaw[] {
        return this.basketItems
    }

    getBasketCount(): number {
        let itemsInBasket: number = 0

        this.basketItems.forEach(product => {
            itemsInBasket += product.quantity
        })

        return itemsInBasket
    }

    getBasket(): BasketData {
        const basketItems: BasketItem[] = []
        
        const items = this.getItems()
        for (const item of items) {
          const product = ProductList.make().getProduct(item.productId)

          
          basketItems.push({
            id: product.id,
            name: product.name,
            quantity: item.quantity,
            totalPrice: product.price * item.quantity
          })
        }
      
        return {
            items: basketItems,
            totalPrice: getTotalPrice(basketItems)
        }
    }
}

function getTotalPrice(basketItems: BasketItem[]): number {
    let totalPrice: number = 0

    basketItems.forEach((basketItem) => {
        totalPrice += basketItem.totalPrice
    })

    return totalPrice
}