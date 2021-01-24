import { ProductList } from "../product-list";
import { IBasket, IBasketItem, IBasketRaw } from "./types";

export class Basket {
    static INSTANCE: Basket | undefined

    private basketItems: IBasketRaw[]

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

    getItems(): IBasketRaw[] {
        return this.basketItems
    }

    getBasketCount(): number {
        let itemsInBasket: number = 0

        this.basketItems.forEach(product => {
            itemsInBasket += product.quantity
        })

        return itemsInBasket
    }

    getBasket(): IBasket {
        const basketItems: IBasketItem[] = []
        
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

function getTotalPrice(basketItems: IBasketItem[]): number {
    let totalPrice: number = 0

    basketItems.forEach((basketItem) => {
        totalPrice += basketItem.totalPrice
    })

    return totalPrice
}