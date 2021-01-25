export interface IBasketRaw {
    productId: string,
    quantity: number
}

export interface IBasketItem {
    id: string,
    name: string,
    quantity: number,
    totalPrice: number
}

export interface IBasket {
    items: IBasketItem[],
    totalPrice: number,
    discountCode?: string
}