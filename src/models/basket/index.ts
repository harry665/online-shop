import { ProductList } from "../product-list";
import { IBasket, IBasketItem, IBasketRaw } from "./types";

export class Basket {
    static INSTANCE: Basket | undefined

    private _basketItems: IBasketRaw[]
    private _discountCode?: string

    static make() {
        if(this.INSTANCE) {
            return this.INSTANCE
        }

        this.INSTANCE = new Basket()

        return this.INSTANCE
    }

    private constructor() {
        this._basketItems = []
    }

    get discountCode(): string | undefined {
        return this._discountCode
    }

    addProduct(productId: string): void {            
        const foundProduct = this._basketItems.find(basketItem => basketItem.productId === productId)
        if(!foundProduct) {
            this._basketItems.push({
                productId: productId,
                quantity: 1
            })

            return
        }

        foundProduct.quantity++
    }

    removeProduct(productId: string): void {
        const index = this._basketItems.findIndex(basketItem => basketItem.productId === productId)

        this._basketItems.splice(index, 1)
    }

    getItems(): IBasketRaw[] {
        return this._basketItems
    }

    getBasketCount(): number {
        let itemsInBasket: number = 0

        this._basketItems.forEach(product => {
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
            totalPrice: calculateTotalPrice(getTotalPrice(basketItems), this._discountCode)
        }
    }

    addDiscountCode(discountCode: string): void {
        if(!checkDiscountCode(discountCode)) {
            return
        }

        this._discountCode = discountCode
    }
}

function getTotalPrice(basketItems: IBasketItem[]): number {
    let totalPrice: number = 0

    basketItems.forEach((basketItem) => {
        totalPrice += basketItem.totalPrice
    })

    return totalPrice
}

function calculateTotalPrice(totalPrice: number, discountCode? : string): number {
    let finalPrice = totalPrice

    // when there is not discount code -> return price without discount
    if(!discountCode) {
        return finalPrice
    }

    // when totalPrice is less than minimum order value -> return price without discount
    if(finalPrice < 10) {
        return finalPrice
    }

    // check discount code
    switch (discountCode) {
        case 'SALE21': {
            finalPrice *= 0.85 // caculate with 10% discount
            break;
        }

        case 'NEWYEAR21': {
            finalPrice -= 5.00 // caculate with 5 € discount
            break;
        }
    }

    // if discount code dont matches -> return price without discount
    return finalPrice
}

function checkDiscountCode(discountCode: string): boolean {
    return ['SALE21', 'NEWYEAR21'].includes(discountCode)
}