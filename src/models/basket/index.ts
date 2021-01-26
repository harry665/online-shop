import { ProductList } from "../product-list";
import { IBasket, IBasketItem, IBasketRaw } from "./types";

export class Basket {
    static INSTANCE: Basket | undefined

    private items: IBasketRaw[]
    private _discountCode?: string

    static make() {
        if(this.INSTANCE) {
            return this.INSTANCE
        }

        this.INSTANCE = new Basket()

        return this.INSTANCE
    }

    private constructor() {
        this.items = []
    }

    get discountCode(): string | undefined {
        return this._discountCode
    }

    addProduct(productId: string): void {            
        const foundProduct = this.items.find(item => item.productId === productId)
        if(!foundProduct) {
            this.items.push({
                productId: productId,
                quantity: 1
            })

            return
        }

        foundProduct.quantity++
    }

    removeProduct(productId: string): void {
        const index = this.items.findIndex(item => item.productId === productId)

        this.items.splice(index, 1)
    }

    getItems(): IBasketRaw[] {
        return this.items
    }

    getBasketCount(): number {
        let itemsInBasket: number = 0

        this.items.forEach(product => {
            itemsInBasket += product.quantity
        })

        return itemsInBasket
    }

    getBasket(): IBasket {
        const finalItems: IBasketItem[] = []
        
        const items = this.getItems()
        for (const item of items) {
          const product = ProductList.make().getProduct(item.productId)

          
          finalItems.push({
            id: product.id,
            name: product.name,
            quantity: item.quantity,
            totalPrice: product.price * item.quantity
          })
        }
      
        return {
            items: finalItems,
            totalPrice: calculateTotalPrice(getTotalPrice(finalItems), this._discountCode)
        }
    }

    addDiscountCode(discountCode: string): void {
        if(!checkDiscountCode(discountCode)) {
            return
        }

        this._discountCode = discountCode
    }

    increaseQuantity(productId: string): void {          
        const foundProduct = this.items.find(item => item.productId === productId)
        if(!foundProduct) {
            return
        }

        foundProduct.quantity++
    }

    decreaseQuantity(productId: string): void {          
        const foundProduct = this.items.find(item => item.productId === productId)
        if(!foundProduct) {
            return
        }

        if(foundProduct.quantity > 1) {
            foundProduct.quantity--
            return 
        }

        this.removeProduct(productId)
    }

    updateQuantity(productId: string, quantity: number) {
        const foundProduct = this.items.find(item => item.productId === productId)
        if(!foundProduct) {
            return
        }

        if(quantity === 0) {
            this.removeProduct(productId)
            return 
        }

        foundProduct.quantity = quantity
    }
}

function getTotalPrice(items: IBasketItem[]): number {
    let totalPrice: number = 0

    items.forEach((item) => {
        totalPrice += item.totalPrice
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